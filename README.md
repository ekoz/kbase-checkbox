Checkbox/Radio 插件
=================================================
    用于自定义checkbox/radio样式，支持IE8+，chrome，firefox

引入
-------------------------------------------------
该插件依赖于 [jquery](http://jquery.com/)

	<script src="../js/jquery.kbase.checkbox.js" type="text/javascript"></script>

用法
--------------------------------------------------
	Dom加载完毕后调用 $(selector).kbsElem();
	控件只会初始化type=checkbox 和 type=radio 的元素

	$(':checkbox').kbsElem();
	$(':radio').kbsElem();
	$('#btnRadio').kbsElem();   //不会重复做初始化

	//全部选中
	$('input[name="opt"]').kbsElem('checkAll');
	//全部不选中
	$('input[name="opt"]').kbsElem('uncheckAll');
	//选中值为 Apple 的项
	$('input[name="opt"]').kbsElem('checked', 'Apple');
	//选中值为 Apple 和 Orange 的项
	$('input[name="opt"]').kbsElem('checked', 'Apple,Orange');
	//不选中值为 Orange 的项
	$('input[name="opt"]').kbsElem('unchecked', 'Orange');
	//反选
	$('input[name="opt"]').kbsElem('reverse');
	
* 注意，input元素必须有name和value属性

Demo
--------------------------------------------------

[example/checkbox.html](https://ekoz.github.io/kbase-checkbox/example/checkbox.html)

![Checkbox/Radio](https://ekoz.github.io/kbase-checkbox/example/checkbox.gif?raw=true)
