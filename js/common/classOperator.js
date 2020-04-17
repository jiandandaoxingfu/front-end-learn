/**
 * 用于增,查,改(删)元素的class
 * 主要用字符串连接,替换等
 * @author JMx
 * date  2017-9-19
 */

//增加类
function addClass(element, newClassName) {
	var elementClass = element.getAttribute("class");
	elementClass = elementClass.concat(" " + newClassName); 
	element.setAttribute("class", elementClass);
}

//修改或删除类
function changeClass(element, reClassName, newClassName) {//删除只需传入空的类名
	var elementClass = element.getAttribute("class");
	elementClass = elementClass.replace(reClassName, newClassName); 
	element.setAttribute("class", elementClass);
}