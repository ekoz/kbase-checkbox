/**
 * Created by eko.zhan on 2017-3-22.
 * 用于 checkbox, radio 的样式
 */
;(function($){

    var builder = {
        //copy from layer.js by eko.zhan
        getPath: function(){
            var js = document.scripts, jsPath = js[js.length - 1].src;
            return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
        },
        isLowerBrowser: function() {
            var agent = navigator.userAgent.toLowerCase();
            if (agent.indexOf('msie 6')!=-1 || agent.indexOf('msie 7')!=-1 || agent.indexOf('msie 8')!=-1){
                return true;
            }
            return false;
        },
        //载入模块 copy from layer.js by eko.zhan
        use: function(module, callback){
            var i = 0, head = $('head')[0];
            var $me = $('head').find('script[src*="jquery.kbase.checkbox.js"]');
            var module = module.replace(/\s/g, '');
            var iscss = /\.css$/.test(module);
            var node = document.createElement(iscss ? 'link' : 'script');
            var id = module.replace(/\.|\//g, '');
            if(iscss){
                node.type = 'text/css';
                node.rel = 'stylesheet';
            }
            node[iscss ? 'href' : 'src'] = /^http:\/\//.test(module) ? module : this.getPath() + module;
            node.id = id;
            if(!$('#'+ id)[0]){
                $me.before(node);
            }
            if(callback){
                if(document.all){
                    $(node).ready(callback);
                } else {
                    $(node).load(callback);
                }
            }
        },
        run: function(){
            this.use('jquery.kbase.checkbox.css');
            this.use('attrchange.js');
            this.use('attrchange_ext.js');
        }
    }

    $.fn.extend({
        kbsElem: function(){
            //TODO 是否考虑重复初始化的情况
            var _thisArr = this;
            $(_thisArr).each(function(i, _this){
                var _type = $(_this).attr('type');
                var _id = $(_this).attr('id')==undefined?'':$(_this).attr('id');
                if (_type!='checkbox' && _type!='radio') return false;
                var _kbsCheckboxItem = document.createElement('span');
                _kbsCheckboxItem.setAttribute('class', 'kbs-' + _type + '-item');
                var _kbsCheckboxLabel = document.createElement('label');
                _kbsCheckboxLabel.setAttribute('class', 'kbs-' + _type + '-label');
                var _kbsCheckboxIcon = document.createElement('i');
                _kbsCheckboxIcon.setAttribute('class', 'kbs-' + _type + '-icon');
                var _kbsCheckboxText = document.createElement('em');
                _kbsCheckboxText.setAttribute('class', 'kbs-' + _type + '-text');

                //将input元素的属性复制到label
                var attrs = $(_this)[0].attributes;
                $(attrs).each(function(i, item){
                    //if (item.name!='type'){
                        $(_kbsCheckboxItem).attr(item.name, item.value);
                    //}
                });
                var _text = '';
                if ($(_this).attr('text')==null){
                    _text = $(_this)[0].nextSibling?$.trim($(_this)[0].nextSibling.nodeValue):'';
                    $($(_this)[0].nextSibling).remove();
                    $(_this).attr('text', _text);
                }else{
                    _text = $(_this).attr('text');
                }

                _kbsCheckboxText.innerText = _text;
                _kbsCheckboxLabel.appendChild(_kbsCheckboxIcon);
                _kbsCheckboxLabel.appendChild(_kbsCheckboxText);
                _kbsCheckboxItem.appendChild(_kbsCheckboxLabel)

                $(_this).after(_kbsCheckboxItem);
                $(_this).attr('id', _id + '_' + Math.random()).addClass('kbs-' + _type + '-input');
                $(_this).attrchange({
                    trackValues: true,
                    callback: function (event) {
                        var properties = $(this).attrchange('getProperties');
                        if (event.attributeName=='checked'){
                            if (event.oldValue!=event.newValue && event.newValue==undefined){
                                $(_kbsCheckboxLabel).removeClass('on');
                                $(_kbsCheckboxItem).removeAttr('checked');
                                if (builder.isLowerBrowser()){
                                    $(_this).removeAttr('checked');
                                }else{
                                    $(_this).removeProp('checked');
                                }
                            }else{
                                $(_kbsCheckboxLabel).addClass('on');
                                $(_kbsCheckboxItem).attr('checked', 'checked');
                                if (builder.isLowerBrowser()){
                                    $(_this).attr('checked', true);
                                }else{
                                    $(_this).prop('checked', true);
                                }
                            }
                        }
                    }
                });

                if (_type=='checkbox'){
                    $(_kbsCheckboxItem).on({
                        kbsCheckedChange: function(){
                            if ($(_kbsCheckboxLabel).hasClass('on')){
                                $(_kbsCheckboxLabel).removeClass('on');
                                $(_kbsCheckboxItem).removeAttr('checked');
                                if (builder.isLowerBrowser()){
                                    $(_this).removeAttr('checked');
                                }else{
                                    $(_this).removeProp('checked');
                                }
                            }else{
                                $(_kbsCheckboxLabel).addClass('on');
                                $(_kbsCheckboxItem).attr('checked', 'checked');
                                //低版本浏览器能识别prop，走进attchange方法，高版本浏览器不会走到attrchange方法中
                                if (builder.isLowerBrowser()){
                                    $(_this).attr('checked', true);
                                }else{
                                    $(_this).prop('checked', true);
                                }
                            }
                        },
                        click: function(){
                            $(this).trigger('kbsCheckedChange');
                        }
                    })
                }else{
                    $(_kbsCheckboxItem).click(function(){
                        var _name = $(_this).attr('name');
                        $('input[name="' + _name + '"]').removeProp('checked');
                        $('.kbs-' + _type + '-item[name="' + _name + '"] .on').removeClass('on');
                        $(_kbsCheckboxLabel).addClass('on');
                        $(_this).prop('checked', true);
                    });
                }
            });
            return _thisArr;
        }
    });

    builder.run();
})(jQuery);
