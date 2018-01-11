$(function(){
    // let canvas = $('canvas')[0];
    let con = $('.con')[0];
    let li = document.querySelectorAll('.shape>li');
    let color = document.querySelectorAll('input[type=color]')
    let number = $('.number')[0]
    let che = $('#che');
    let eraser = $('.eraser1')[0];
    let era = $('#eraser');
    let mask = $('.mask')[0];
    let font = $('#font');
    let fonts = $('#fonts');
    let clip = $('#clip');
    let clips = $('#clips');
    let save = $('.save')[0];
    let open = $('.open')[0];

    // 新建
    let canvas,pal;
    console.log(con)
    open.onclick = function(){
        canvas = $('<canvas>');
        canvas.width = 1200;
        canvas.height = 500;
        con.appendChild(canvas);
        this.classList.add('hot');
        pal = new Palette(mask,canvas,eraser);//实例化对象
    }

    // 撤销
    che.onclick = function(){
        che.classList.add('hot')
        pal.che()
    }


    // 画布方法
    li.forEach(function(ele){
        ele.onclick = function(){
            let type = this.id;
            li.forEach(function(e){
                e.classList.remove('hot')

            })
            ele.classList.add('hot');

            if(type == 'polygon' || type == 'horn'){
                console.log(1)
                let num=parseInt(prompt('请输入边数或者角的数量'));
                pal.draw(type,num)
            }else{
                pal.draw(type)
            }
        }
    })

    // 默认第一个
    // li[0].onclick()

    // 调用橡皮擦
    era.onclick = function(){

        let w = parseInt(prompt('请输入橡皮尺寸'));
        eraser.style.width = w+'px';
        eraser.style.height = w+'px';
        pal.eras(w);
    }
    // input颜色
    color.forEach(function(ele){
        color.forEach(el =>{
            el.classList.remove('hot')

        })
        ele.onchange = function(){
            pal[this.id] = this.value;
            ele.classList.add('hot')

        }
    })


    // 选择填充描边
    fill.addEventListener('click',function(){
        this.classList.add('hot')
        stroke.classList.remove('hot')
        pal.style = this.id;
    })
    stroke.addEventListener('click',function(){
        this.classList.add('hot')
        fill.classList.remove('hot')
        pal.style = this.id;
    })

    // 线宽
    number.onchange = function(){

        pal.lineWidth = this.value;
    }


    // 填充字体
    font.onclick = function(){
        let types = font.id;
        this.classList.add('hot');
        pal.fontt(types)
    }
    // 描边字体
    fonts.onclick = function(){
        let types = fonts.id;
        this.classList.add('hot');
        pal.fontt(types)
    }

    // 裁切
    clips.onclick = function(){
        this.classList.add('hot');
        pal.clip(clip);

    }

    // 保存
    save.onclick = function(){
        let data = canvas.toDataURL('image/png');
        // console.log(data)
        save.href = data;
        save.download = '1.png'
    }




})