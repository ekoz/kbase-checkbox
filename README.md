Checkbox/Radio 插件
=================================================
    用于自定义checkbox/radio样式，支持IE8+，chrome，firefox

使用方法
-------------------------------------------------
该插件依赖于 [jquery](http://jquery.com/)

	<script src="../js/jquery.kbase.checkbox.js" type="text/javascript"></script>

初始化
--------------------------------------------------
	Dom加载完毕后调用 $(selector).kbsElem(); 控件只会初始化type=checkbox 和 type=radio 的元素

	$(':checkbox').kbsElem();
	$(':radio').kbsElem();
	$('#btnRadio').kbsElem();   //不会做初始化

	$('input[name="opt"]').kbsElem('checked'); //选中/不选中

Demo
--------------------------------------------------

[example/checkbox.html](http://ekoz.github.io/example/checkbox.html)

![Checkbox/Radio](https://github.com/ekoz/kbase-checkbox/blob/master/example/checkbox.gif?raw=true)
