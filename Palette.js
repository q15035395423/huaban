class Palette{
    constructor(mask,canvas,eraser){
        this.canvas = canvas;
        this.mask = mask;
        this.ctx = this.canvas.getContext("2d");
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
        this.img = [];
        this.style = 'stroke';
        this.eraser = eraser;
        // this.style = this.stroke;
        // this.fillStyle = this.stroke;
        this.strokeStyle = '#000';
        this.filleStyle = '#000';
        this.history = null;
    }


    // 初始化方法
    ine(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.lineWidth = this.lineWidth;
    }


    // 直线,不能作为构造函数,没有arguments,没有this
    line(ox,oy,mx,my){
        this.ctx.beginPath();
        this.ctx.moveTo(ox,oy);
        this.ctx.lineTo(mx,my);
        // this.ctx.closePath();
        this.ctx.stroke();
    }


    // 虚线
    dash(ox,oy,mx,my){
        this.ctx.beginPath();
        this.ctx.setLineDash([5,15]);
        this.ctx.moveTo(ox,oy);
        this.ctx.lineTo(mx,my);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.setLineDash([0,0])
    }


    // 铅笔that.ctx[that.style]()
    pencil(){
        let that = this;
        that.mask.onmousedown = function(e){
            that.ine()
            let ox = e.offsetX, oy = e.offsetY;
            that.ctx.beginPath();
            // that.ctx.moveTo(ox,oy);
            that.mask.onmousemove = function(e){

                let mx = e.offsetX, my = e.offsetY;
                that.ctx.clearRect(0, 0, that.cw, that.ch);
                if(that.img.length){
                    that.ctx.putImageData(that.img[that.img.length-1],0,0)
                }

                // that.ctx.moveTo(ox,oy);
                that.ctx.lineTo(mx,my);
                that.ctx.stroke();
                // that.ctx.closePath();
                // that.ctx.stroke();
            }
            that.mask.onmouseup = function(){
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                that.img.push(that.ctx.getImageData(0, 0, that.cw, that.ch))

            }
        }
    }

    // 圆形
    radius(ox,oy,mx,my){
        let that = this;
        that.ctx.beginPath();
        let r = Math.sqrt(Math.pow(mx - ox,2) + Math.pow(my - oy,2))
        that.ctx.arc(ox,oy,r,0,2*Math.PI)
        that.ctx.closePath();
        that.ctx[that.style]();
    }


    // 矩形
    rect(ox,oy,mx,my){

        let w = mx - ox, h = my - oy;
        this.ctx.beginPath();
        this.ctx[this.style + 'Rect'](ox, oy, w, h);


    }
    // 多边形
    polygon(ox,oy,mx,my,num){
        let that = this;
        num = num||5;
        // 角度
        let deg = 2*Math.PI/num;
        // 确定半径
        that.ctx.beginPath();
        let r = Math.sqrt(Math.pow(my-oy,2) + Math.pow(ox-mx,2))
        that.ctx.moveTo(ox + r, oy)
        // 确定点
        for(let i = 0; i < num;i++){
            let x = ox + r*Math.cos(deg * i)
            let y = oy + r*Math.sin(deg * i)
            that.ctx.lineTo(x,y)
        }
        that.ctx.closePath();
        that.ctx[that.style]();
    }

    // 多角形
    horn(ox,oy,mx,my,num){
        num = num || 5;
        let that = this;
        let deg = Math.PI/num;
        let r = Math.sqrt(Math.pow(my-oy,2) + Math.pow(mx-ox,2))
        that.ctx.moveTo(ox + r, oy)
        // 确定点
        that.ctx.beginPath();
        let x,y;
        for(let i = 0; i < num*2;i++){
            if(i % 2 == 0){
                x = ox + r/3*Math.cos(deg * i)
                y = oy + r/3*Math.sin(deg * i)
            }else{
                x = ox + r*Math.cos(deg * i)
                y = oy + r*Math.sin(deg * i)
            }

            that.ctx.lineTo(x,y)
        }
        that.ctx.closePath();
        that.ctx[that.style]();
    }

    draw(type,num){
        let that = this;
        document.onkeydown = function(e){

            if(e.ctrlKey && e.key == 'z'){

                let abs = that.img.pop();

                if(that.img.length > 0){
                    that.ctx.putImageData(abs,0,0)

                }else{

                    that.ctx.clearRect(0,0,that.cw,that.ch)
                }
            }
        }
        that.mask.onmousedown = function(e){
            let ox = e.offsetX, oy = e.offsetY;
            that.ine()
            that.mask.onmousemove = function(e){

                let mx = e.offsetX, my = e.offsetY;
                that.ctx.clearRect(0, 0, that.cw, that.ch);

                if(that.img.length){
                    that.ctx.putImageData(that.img[that.img.length-1],0,0)
                }



                that[type](ox,oy,mx,my,num)
                // that.ctx[that.style]();
            }
            that.mask.onmouseup = function(){
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                that.img.push(that.ctx.getImageData(0, 0, that.cw, that.ch));
            }
        }

    }

    // 撤销
    che(){
        if(this.img.length){
            let abs = this.img.pop();
            this.ctx.putImageData(abs,0,0)
        }else{
            this.ctx.clearRect(0,0,this.cw,this.ch)
        }
    }


    // 橡皮
    eras(w){
        let that = this;
        that.mask.onmousedown = function(e){
            that.eraser.style.display = 'block';
            let ox = e.offsetX, oy = e.offsetY;
            // that.eraser.style.top = oy - w/2 + 'px';
            // that.eraser.style.left = ox - w/2 + 'px';





            that.mask.onmousemove = function(e){
                let mx = e.offsetX, my = e.offsetY;
                let p1 = my - w/2;
                let p2 = mx - w/2;


                // that.ctx.clearRect(p2,p1,w,w);
                let lefts = that.mask.offsetWidth - w;
                let tops = that.mask.offsetHeight - w;
                if(p1 > tops){
                    p1 = tops;
                }
                if(p2 > lefts){
                    p2 = lefts;
                }
                if(p1 < 0){
                    p1 = 0;
                }
                if(p2 < 0){
                    p2 = 0;
                }
                that.eraser.style.top = p1 + 'px';
                that.eraser.style.left = p2 + 'px';
                that.ctx.clearRect(p2,p1,w,w);
            }

            that.mask.onmouseup = function(){
                that.img.push(that.ctx.getImageData(0, 0, that.cw, that.ch));
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                console.log(eraser)
                that.eraser.style.display = 'none';
                // that.ctx.clearRect(0,0,0,0);


            }
        }
    }

    // inp字体
    fontt(types){
        this.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            this.mask.onmousedown = null;
            let inp = $('<input>');
            inp.autofocus = true;
            // inp.focus();
            inp.style.cssText = `
				position:absolute;
				top:${oy}px;
				left:${ox}px;
				width:100px;
				height:30px;
			`
            this.mask.appendChild(inp);

            // 失去焦点,把inp的文字添加到页面,移除inp
            inp.onblur = function(){
                let v = inp.value;
                let oxx = inp.offsetLeft,oyy = inp.offsetTop;//inp字体的位置在拖动后的自身left,top处
                this[types](oxx,oyy,v)
                this.img.push(this.ctx.getImageData(0, 0, this.cw, this.ch));//保存字体的渲染像素
                this.mask.removeChild(inp);
                inp = null;

            }.bind(this);
            inp.onmousedown = function(e){
                let cx = e.clientX,cy = e.clientY;
                let k = inp.offsetLeft,g = inp.offsetTop;

                this.mask.onmousemove = function(e){
                    let cxx = e.clientX,cyy = e.clientY;
                    let lefts = k + (cxx - cx);
                    let tops = g + (cyy - cy);


                    if(lefts < 5){
                        lefts = 0;
                    }
                    if(lefts > this.cw - 100){
                        lefts = this.cw - 100;
                    }
                    if(tops < 0){
                        tops = 0;
                    }
                    if(tops > this.ch - 30){
                        tops = this.ch - 30;0.
                    }
                    inp.style.left = lefts + 'px';
                    inp.style.top = tops + 'px';

                }.bind(this)

            }.bind(this)
            inp.onmouseup = function(){
                this.img.push(this.ctx.getImageData(0, 0, this.cw, this.ch));
                this.mask.onmousemove = null;
            }.bind(this)

        }.bind(this);
    }

    // // 填充字体
    font(oxx,oyy,v){
        this.ctx.font = "24px/30px serif"
        this.ctx.fillText(v, oxx,oyy)
    }

    // 描边字体
    fonts(oxx,oyy,v){
        this.ctx.font = " bold 30px 宋体"
        this.ctx.strokeText(v, oxx,oyy)
    }

    clip(clip){
        let that = this;
        let minx,miny,widths,heights;
        that.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            clip.style.display = 'block';
            clip.style.left = ox + 'px';
            clip.style.top = oy + 'px';
            that.mask.onmousemove = function(e){
                let mx = e.offsetX, my = e.offsetY;
                widths = Math.abs(mx - ox);
                heights = Math.abs(my - oy);
                minx = mx < ox ? mx : ox;
                miny = my < oy ? my : oy;
                clip.style.width = widths + 'px';
                clip.style.height = heights + 'px';
                clip.style.left = minx + 'px';
                clip.style.top = miny + 'px';


            }
            that.mask.onmouseup = function(){
                that.mask.onmouseup = null;
                that.mask.onmousemove = null;
                that.history = that.ctx.getImageData(minx,miny,widths,heights);
                that.ctx.clearRect(minx,miny,widths,heights);
                that.img.push(that.ctx.getImageData(0,0,that.cw,that.ch))
                that.ctx.putImageData(that.history,minx,miny);
                that.drag(clip,minx,miny)
            }
        }
    }

    drag(obj,minx,miny){
        let that = this;
        that.mask.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.mask.onmousemove = function(e){
                let mx = e.offsetX, my = e.offsetY;
                let lefts = minx + (mx - ox);
                let tops = miny + (my - oy);
                if(lefts > that.canvas.width - obj.offsetWidth){
                    lefts = that.canvas.width - obj.offsetWidth;
                }
                if(lefts < 0 ){
                    lefts = 0;
                }
                if(tops > that.canvas.height - obj.offsetHeight){
                    tops = that.canvas.height - obj.offsetHeight;
                }
                if(tops < 0 ){
                    tops = 0;
                }
                obj.style.top = tops + 'px';
                obj.style.left = lefts + 'px';
                that.ctx.clearRect(0,0,that.cw,that.ch)//每次拖动之前清除画布
                if(that.img.length){
                    that.ctx.putImageData(that.img[that.img.length-1],0,0)//把移动前的状态保存到数组
                }

                that.ctx.putImageData(that.history,lefts,tops)//让像素跟着移动
            }
            that.mask.onmouseup = function(){
                that.mask.onmousedown = null;
                that.mask.onmouseup = null;
                that.mask.onmousemove = null;
                obj.style.display = 'none';
                that.img.push(that.ctx.getImageData(0, 0, that.cw, that.ch));//把裁下来的区域添加到数组中保存

            }
        }
    }




}



// contenteditable = 'true' //div的属性,内容是否可以编辑,默认false
// this.onmousedown = null; //相当于添加了一次性事件,防止失去焦点的时候触发再次事件
// 数组方法里的回调函数指向是window,因为没直接去调用,filter可以传两个参数,第二个是this指向
// div.onclick = function(){
// 	console.log(this);
// }.bind(this);
