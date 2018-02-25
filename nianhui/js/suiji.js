//返回false代表可以添加
    var a=[0];
    function aa(number)
    {
        var z=false
        var num=number;
        for(var i=0;i< a.length;i++)
        {
            if(a[i]==num)
            {
                z=true;
            }
        }
        return z;
    }
    function bb(m,n){
        if(m>n)
        {
            alert("你输入的范围不对，请重新输入");
        }
        else {
            for (var j=0;j<m;j++)
            {
                var number=parseInt(Math.random()*n);
                while (true)
                {
                    if(aa(number)){
                        number=parseInt(Math.random()*n);
                    }
                    else {
                        a[j]=number;
                        break;
                    }
                }

            }
        }



    }
    console.log(bb(1,10))