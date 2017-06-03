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
        },
        init: function(elem){
            //TODO 是否考虑重复初始化的情况
            var _thisArr = elem;
            $(_thisArr).each(function(i, _this){
                //必须要考虑重复初始化的情况 add by eko.zhan at 2017-04-01
                //如果已经初始化 不再重复初始化
                if ($(_this).hasClass('kbs-checkbox-input')) return;

                var _type = $(_this).attr('type');
                var _id = $(_this).attr('id')==undefined?'':$(_this).attr('id');
                if (_type!='checkbox' && _type!='radio') return;
                var _kbsCheckboxItem = document.createElement('span');
                _kbsCheckboxItem.setAttribute('class', 'kbs-' + _type + '-item');
                var _kbsCheckboxLabel = document.createElement('label');
                _kbsCheckboxLabel.setAttribute('class', 'kbs-' + _type + '-label');
                var _kbsCheckboxIcon = document.createElement('i');
                _kbsCheckboxIcon.setAttribute('class', 'kbs-' + _type + '-icon');
                var _kbsCheckboxText = document.createElement('em');
                _kbsCheckboxText.setAttribute('class', 'kbs-' + _type + '-text');
                var _kbsCheckboxClear = document.createElement('span');
                _kbsCheckboxClear.setAttribute('style', 'float:none;clear:both;');


                //将input元素的属性复制到label
                var attrs = $(_this)[0].attributes;
                $(attrs).each(function(i, item){
                    if (item.name!='class'){    //样式会造成干扰
                        $(_kbsCheckboxItem).attr(item.name, item.value);
                    }
                });
                var _text = '';
                if ($(_this).attr('text')==null){
                    //_text = $(_this)[0].nextSibling?($(_this)[0].nextSibling.nodeValue?$.trim($(_this)[0].nextSibling.nodeValue):$(_this)[0].nextSibling):'';
                    if ($(_this)[0].nextSibling){
                        if ($(_this)[0].nextSibling.nodeValue){
                            _text = $.trim($(_this)[0].nextSibling.nodeValue);
                            $($(_this)[0].nextSibling).remove();
                        }else{
                            $($(_this)[0].nextSibling).css({'margin-left': '-10px'})
                        }
                    }
                    $(_this).attr('text', _text);
                }else{
                    _text = $(_this).attr('text');
                }

                _kbsCheckboxText.innerText = _text;
                _kbsCheckboxLabel.appendChild(_kbsCheckboxIcon);
                _kbsCheckboxLabel.appendChild(_kbsCheckboxText);
                _kbsCheckboxLabel.appendChild(_kbsCheckboxClear);
                _kbsCheckboxItem.appendChild(_kbsCheckboxLabel)

                $(_this).after(_kbsCheckboxItem);
                $(_this).attr('id', _id + '_' + Math.random()).addClass('kbs-' + _type + '-input');

                if (_type=='checkbox'){
                    $(_kbsCheckboxItem).on({
                        click: function(){
                            if ($(_kbsCheckboxLabel).hasClass('on')){
                                $(_kbsCheckboxLabel).removeClass('on');
                                $(_kbsCheckboxItem).removeAttr('checked');
                                $(_this).removeProp('checked');
                            }else{
                                $(_kbsCheckboxLabel).addClass('on');
                                $(_kbsCheckboxItem).attr('checked', 'checked');
                                $(_this).prop('checked', true);
                            }
                        }
                    })
                }else{
                    $(_kbsCheckboxItem).click(function(){
                        var _name = $(_this).attr('name');
                        $('input[name="' + _name + '"]').removeProp('checked');
                        $('.kbs-' + _type + '-item[name="' + _name + '"]').children('.on').removeClass('on');
                        $(_kbsCheckboxLabel).addClass('on');
                        $(_this).prop('checked', true);
                    });
                }

                if ($(_this).prop('checked')){
                    $(_kbsCheckboxItem).click();
                }
            });
            return _thisArr;
        },
        //选中指定的项
        checked: function(elem, opts){
            if (opts==null){
                this.checkAll(elem);
            }else{
                var idArr = opts.split(',');
                $(idArr).each(function(i, id){
                    var item = $('span[value="' + id + '"]');
                    if ($(item).attr('type')=='radio'){
                        $('.kbs-radio-item[name="' + $(item).attr('name') + '"]').children('.on').removeClass('on');
                    }
                    var _kbsCheckboxItem = $('span[name="' + $(item).attr('name') + '"][value="' + $(item).attr('value') + '"]');
                    $(_kbsCheckboxItem).children('label').addClass('on');
                    $(_kbsCheckboxItem).attr('checked', 'checked');
                    $('input[name="' + $(item).attr('name') + '"][value="' + $(item).attr('value') + '"]').prop('checked', true);
                });
            }
        },
        //不选中指定的项
        unchecked: function(elem, opts){
            if (opts==null){
                this.uncheckAll(elem);
            }else{
                var idArr = opts.split(',');
                $(idArr).each(function(i, id){
                    var item = $('span[value="' + id + '"]');
                    if ($(item).attr('type')=='radio'){
                        $('.kbs-radio-item[name="' + $(item).attr('name') + '"]').children('.on').removeClass('on');
                    }
                    var _kbsCheckboxItem = $('span[name="' + $(item).attr('name') + '"][value="' + $(item).attr('value') + '"]');
                    $(_kbsCheckboxItem).children('label').removeClass('on');
                    $(_kbsCheckboxItem).removeAttr('checked');
                    $('input[name="' + $(item).attr('name') + '"][value="' + $(item).attr('value') + '"]').removeProp('checked');
                });
            }
        },
        //全部选中
        checkAll: function(elem){
            $(elem).each(function(i, item){
                //$('span[name="' + $(item).attr('name') + '"][value="' + $(item).attr('value') + '"]').click();
                if ($(item).attr('type')=='radio'){
                    $('.kbs-radio-item[name="' + $(item).attr('name') + '"]').children('.on').removeClass('on');
                }
                var _kbsCheckboxItem = $('span[name="' + $(item).attr('name') + '"][value="' + $(item).attr('value') + '"]');
                $(_kbsCheckboxItem).children('label').addClass('on');
                $(_kbsCheckboxItem).attr('checked', 'checked');
                $(item).prop('checked', true);
            });
        },
        //全部不选
        uncheckAll: function(elem){
            $(elem).each(function(i, item){
                var _kbsCheckboxItem = $('span[name="' + $(item).attr('name') + '"][value="' + $(item).attr('value') + '"]');
                $(_kbsCheckboxItem).children('label').removeClass('on');
                $(_kbsCheckboxItem).removeAttr('checked');
                $(item).removeProp('checked');
            });
        },
        //反选
        reverse: function(elem){
            var _this = this;
            $(elem).each(function(i, item){
                var _kbsCheckboxItem = $('span[name="' + $(item).attr('name') + '"][value="' + $(item).attr('value') + '"]');
                if ($(item).prop('checked')==true){
                    _this.unchecked(elem, $(item).attr('value'));
                }else{
                    _this.checked(elem, $(item).attr('value'));
                }
            });
        },
        debug: function(o){
            if (window.console && window.console.log){
                console.log(o);
            }
        },
        fire: function(key, elem, opts){
            if (typeof key == 'string') {
                if (this[key]){
                    return this[key](elem, opts);
                }else{
                    this.debug('function [' + key + '] undefined');
                }
            }
        }
    }

    $.fn.extend({
        kbsElem: function(key, opts){
            var _this = this;
            if (key==undefined || typeof key!='string'){
                builder.init(_this);
            }else{
                //判断控件是否初始化，如果未初始化，先初始化控件
                var item = $('span[name="' + $(_this).attr('name') + '"][value="' + $(_this).attr('value') + '"]');
                if (item.length==0){
                    builder.init(_this);
                }
                builder.fire(key, _this, opts);
            }
        }
    });

    builder.run();
})(jQuery);