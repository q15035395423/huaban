/*
* @Author: 29016
* @Date:   2017-12-12 09:37:26
* @Last Modified by:   29016
* @Last Modified time: 2017-12-14 13:48:11
*/
function childNode(element){
		let arr = [];
		let childNodes = element.childNodes;
		childNodes.forEach(function(ele){
			if(ele.nodeType == 1){arr.push(ele)}
		});
		return arr;
	

	for(let i = 0;i < childnodes.length;i++){
		if(childnodes[i].nodeType == 1){
			arr.push(childnodes[i]);
		}
	}
	return arr;
}	
 
	// 冒充：数组 冒充
	// arr = Array.prototype.filter.call(childnodes,function(element){
	// 	return element.nodeType == 1
	// });
	// return arr;



	/*
	获取指定元素
	$(select[,ranger]);
	select  String  选择器
	ranger  对象（元素节点）选择范围
	$('#box');
	$('.box');
	$('div');

	$('<p>');  创建

	1、首字符
		分类
		 #     id
		 .     class
		 tag   tagname
	*/
		 let box = $('.box');
		 let divs = $('<div>');
		 divs.innerText = 'hello';
		 // divs[0].appendChild(divs);   /* 往后面插*/
		 // prepend(box[0],divs);
		 // append(box[0],divs);
		 // box[0].append();
		 // box[0].prepend();

		 // let cNode = box[0].cloneNode(ture);  /*克隆*/
		 // document.body.append(cNode);
	function $(select,ranger){
		if(typeof select == 'string'){
			// ranger = ranger ? ranger : document; /*三种方法 1、加一个参数 2、三元运算符 3、逻辑或*/
			ranger = ranger || document;  
			let selector = select.trim();    /*去空*/
			let firstChar = selector.charAt(0);
			if(firstChar == '#'){
				return document.getElementById(selector.substring(1));
			}else if(firstChar == '.'){
				return ranger.getElementsByClassName(selector.substring(1));
			}else if(/^[a-zA-Z][A-Za-z1-6]{0,6}$/.test(selector)){     /*判断是否是标签用正则判断一下*/
				return ranger.getElementsByTagName(selector);
			}else if(/^<[a-zA-Z][A-Za-z1-6]{0,6}>$/.test(selector)){     /*判断是否是标签用正则判断一下*/
				return document.createElement(selector.slice(1,-1));
			}
		}else if(typeof select == 'function'){
			window.onload = function(){
				select();
			}
		}
 	}	



 	// prepend()
 	 /*在某一个元素的最前面插入一个子元素 => 第一个元素节点之前
 	 1、找到第一个元素节点*/
 	 function append(parentNode,child){
 	 	parentNode.appendChild(child)
 	 }

 	 function prepend(parentNode,child){
 	 	let firstChild = parentNode.firstElementChild;
 	 	if(firstChild){
 	 		parentNode.insertBefore(child,firstChild);
 	 	}else{
 	 		parentNode.appendChild(child);
 	 	}
 	 	
 	 }


 	 HTMLElement.prototype.append = function(child){
 	 	this.appendChild(child);
 	 };

 	 HTMLElement.prototype.appendTo = function(parentNode){
		// parentNode.append(this);
		parentNode.appendChild(this);
 	 }

 	 HTMLElement.prototype.prepend = function(child){
 	  	let firstChild = this.firstElementChild;
 	 	if(firstChild){
 	 		this.insertBefore(child,firstChild);
 	 	}else{
 	 		this.appendChild(child);
 	 	}
 	  };

 	   HTMLElement.prototype.prependTo = function(parentNode){
 	   		parentNode.prepend(this);
 	   };


 	   /*
		* box.insert(div)
		* div.insertTo(box)
		*  
		外部*/
 	   HTMLElement.prototype.insert = function(node){
 	   		// this node
 	   		let parent = this.parentNode;  /*获取父元素*/
 	   		parent.insertBefore(node,this)
 	   };

 	   /*在元素后面插 --> 在兄弟元素(元素节点)的前面插*/
 	   HTMLElement.prototype.after = function(node){
 	   		// this  node
 	   		let next = this.nextElementSibling;
 	   		if(next){
 	   			next.insert(node);
 	   		}else{
 	   			let parent = this.parentNode;
 	   			parent.append(node);
 	   		}
 	   }

 	   HTMLElement.prototype.afterTo = function(node){
 	   		node.after(this);
 	   };

 	   /*查找*/
 	   HTMLElement.prototype.parent = function(){     /*父元素*/
 	   		return this.parentNode;
 	   };

 	   HTMLElement.prototype.parents = function(){      /*查找父辈元素*/
 	   		let arr = [];
 	   		let parent = this.parentNode;
 	   		if(this.nodeName == 'BODY'){
 	   			arr.push(parent);
 	   		}
 	   		while(parent.nodeName != 'HTML'){
 	   			arr.push(parent);
 	   			parent = parent.parentNode;   /*更新,找到当前父元素的下一个父元素*/
 	   			if(parent.nodeName == 'HTML'){
 	   				arr.push(parent);
 	   			}
 	   		}
 	   		return arr;
 	   };

 	   HTMLElement.prototype.offsetParents = function(){
 	   	let parents = this.parents();    /*先获取所有的父元素*/
 	   	let node = null;
 	   	for(let i = 0;i < parents.length;i++){
 	   		// parents[i].style.position       /*只能获取行内*/
 	   		let v = window.getComputedStyle(parents[i],null).position;       /*不能设置*/
 	   		if(v == 'relative' || v == 'absolute'){
 	   			node = parents[i];
 	   			break;
 	   		}
 	   	}
 	   	if(!node){
 	   		node = document.body;
 	   	}
 	   	return node;
 	   };

 	   /*
	  *  用来产生很多弹窗
	  *  属性
	  *    谁
	  *    速度
	  *    最大偏移量
	  *    自身的尺寸(谁)
	  * 方法
	  *    start
	   */
	  
	  class Float{
	  	constructor(obj){
	  		this.obj = obj;
	  		this.speedy = 10;
	  		this.maxH = window.innerHeight - this.obj.offsetHeight;
	  	}
	  	start(){
	  		this.move();
	  	}
	  	move(){
	  		let _this = this;
	  		_this.t = setInterval(function(){
	  			let tops = _this.obj.offsetTop + _this.speedy;
	  			if(tops >= _this.maxH){
	  				tops = _this.maxH;
	  				_this.speedy *= -1;
	  			}
	  			if(tops <= 0){
	  				tops = 0;
	  				_this.speedy *= -1;
	  			}
	  			_this.obj.style.top = tops + 'px';
	  		},100)
	  	}
	  	stop(){
	  		clearInterval(this.t);
	  }
	  	resize(){
	  		this.maxH = innerHeight - this.obj.offsetHeight;
	  	}
	}
