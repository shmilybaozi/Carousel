window.onload = function () {
    //需求：点击足有按钮实现旋转木马。
        //原理：点击右侧按钮，让3号盒子的样式赋值给2号盒子，然后2->1,1->5,5->4,4->3...
        //左侧同理。
    //步骤：
    //1.鼠标放到轮播图上，两侧的按钮显示，移开隐藏。
    //2.让页面加载出所有的盒子的样式。
    //3.把两侧按钮绑定事件。(调用同一个方法，只有一个参数，true为正向旋转，false为反向旋转)
    //4.书写函数。
        // (操作数组。正向旋转：删除数组中第一个样式，添加到数组中的最后一位)
        // (操作数组。反向旋转：删除数组中最后一个样式，添加到数组中的第一位)


    let arr = [
        {   //  1
            width:400,
            top:70,
            left:50,
            opacity:20,
            zIndex:2
        },
        {  // 2
            width:600,
            top:120,
            left:0,
            opacity:80,
            zIndex:3
        },
        {   // 3
            width:800,
            top:100,
            left:200,
            opacity:100,
            zIndex:4
        },
        {  // 4
            width:600,
            top:120,
            left:600,
            opacity:80,
            zIndex:3
        },
        {   //5
            width:400,
            top:70,
            left:750,
            opacity:20,
            zIndex :2
        }
    ];

    //0.获取元素
    let slide = document.getElementById("slide");
    let liArr = slide.children[0].children;
    let arrow = slide.children[1];
    let arrowArr = slide.children[1].children;

    //设置一个开闭原则变量，点击以后修改这个值。
    let flag = true;
    
    //1.鼠标放到轮播图上，两侧的按钮显示，移开隐藏。
    slide.onmouseenter = function () {
        animate(arrow,{"opacity":100});
    };
    slide.onmouseleave = function () {
        animate(arrow,{"opacity":0});
    };

    //2.让页面加载出所有的盒子的样式。
    move();


    //3.把两侧按钮绑定事件。(调用同一个方法，只有一个参数，true为正向旋转，false为反向旋转)

    arrowArr[0].onclick = function () {
        if (flag) {
            flag = false;
            //点击一次立刻修改为false，这样别人就不能再点击。（点击也不执行move();）
            move(true);
            }
    };

    arrowArr[1].onclick = function () {
        if (flag) {
            flag = false;
            move(false);
            }
    };



    //4.书写函数。
    // (操作数组。正向旋转：删除数组中第一个样式，添加到数组中的最后一位)
    // (操作数组。反向旋转：删除数组中最后一个样式，添加到数组中的第一位)
    //arr.push();//在最后添加
    //arr.pop();//删除最后一位
    //arr.unshift();//在最前面添加
    //arr.shift();//删除第一位
    function move(bool) {
        //判断：如果等于undefined,那么就不执行这两个if语句
        if(bool === true || bool === false){
            if (bool) {
                // (操作数组。反向旋转：删除数组中最后一个样式，添加到数组中的第一位)
                arr.unshift(arr.pop());
            } else {
                // (操作数组。正向旋转：删除数组中第一个样式，添加到数组中的最后一位)
                arr.push(arr.shift());
            }
        }



        //在此为页面上的所有li赋值属性，利用缓动框架
        for (let i=0; i<liArr.length; i++) {
            animate(liArr[i],arr[i],function () {
                //回调函数，所有程序执行完毕，在初始化flag的值为true
                flag = true;
            })
        }
    }
};