function show(ele){
    ele.style.display = "block";
}

/**
 * 获取元素样式兼容写法
 * @param ele
 * @param attr
 * @returns {*}
 */
function getStyle(ele,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(ele,null)[attr];
    }
    return ele.currentStyle[attr];
}


//参数变为3个,回调函数
function animate(ele,json,fn){

    // 1.要用定时器，先清定时器
    clearInterval(ele.timer);

    // 2.设置定时器
    ele.timer = setInterval(function () {

        let flag = true;

        // 遍历json
        //attr == k(键)    target == json[k](值)
        for (let k in json){
            if (!json.hasOwnProperty(k)) continue;

            let leader;
            //判断如果属性为opacity的时候特殊获取值
            if (k === "opacity") {
                leader = getStyle(ele,k)*100 || 1; //取值*100,一般不用小数计算
            } else {
                leader = parseInt(getStyle(ele,k)) || 0;
            }

            // 2.1获取步长并优化
            let step = (json[k] - leader)/10;
            step = step>0? Math.ceil(step) : Math.floor(step);
            leader += step;
            // 3.赋值
            //特殊情况特殊赋值
            if (k === "opacity") {
                ele.style[k] = leader/100;
                //兼容IE678
                ele.style.filter = "alpha(opacity="+leader+")";
            } else if (k === "zIndex"){
                //如果是层级，一次行赋值成功，不需要缓动赋值
                //为什么？需求！
                ele.style[k] = json[k];
            } else {
                ele.style[k] = leader + "px";
            }

            //4.清除定时器
            if (json[k] !== leader) {
                flag = false;
            }

        }
        if(flag){
            clearInterval(ele.timer);

            //所有程序执行完毕了，现在可以执行回调函数了
            //只有传递了回调函数，才能执行
            if(fn) {
                fn();
            }
        }
    },30)
}


//获取屏幕可视区域的宽高
function client(){
    if(window.innerHeight !== undefined){
        return {
            "width": window.innerWidth,
            "height": window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){
        return {
            "width": document.documentElement.clientWidth,
            "height": document.documentElement.clientHeight
        }
    }else{
        return {
            "width": document.body.clientWidth,
            "height": document.body.clientHeight
        }
    }
}