/**
 * Created by 95112 on 2018/4/5.
 */
/**
 *
 * Created by 95112 on 2018/4/4.
 */
var size;
var tXStep;
var tYStep;
var pipeGroup;
var number;
var winBoard = null;
var over;
var tubeLayer3 = cc.Layer.extend({
    ctor:function(){
        this._super();
        pipeGroup = [];
        over =false;
        size = cc.director.getWinSize();
        var Board = new cc.MenuItemFont("恭喜全部过关,回到主菜单",this.nextGame,this);
        Board.fontSize = 33;
        winBoard =new cc.Menu(Board);
        winBoard.y = size.height/2+200;
        var bgSprite = new cc.Sprite(res.waterBackground);
        bgSprite.attr({
            x:size.width/2,
            y:size.height/2
        });
        this.addChild(bgSprite);
        cc.audioEngine.playMusic("res/sounds/bgm2.wav",true);
        tXStep = size.width/6;
        tYStep = size.height/6;

        var backHome = new BackSprite(res.backHome);
        backHome.attr({
            x:size.width-backHome.width/5,
            y:size.height-backHome.height/5,
            scale:0.4
        });
        this.addChild(backHome);
        this.addStartAndEnd();
        this.addMustPipe();
        this.addNoisePipe();
        this.scheduleUpdate();
    },
    addStartAndEnd:function(){
        var pipeStart = new cc.Sprite(res.pipeNode);
        pipeStart.attr({
            x:pipeStart.width/2,
            y:size.height/2,
            rotation:90,
            scaleX:0.7

        });
        this.addChild(pipeStart);
        var pipeEnd = new cc.Sprite(res.pipeNode);
        pipeEnd.attr({
            x:size.width-pipeStart.width/2,
            y:size.height/2,
            rotation:90,
            scaleX:0.7

        });
        this.addChild(pipeEnd);
    },
    nextGame:function(){
        cc.director.runScene(new MenuScene);
    },
    update:function(){
        this.removePipe();
        this.drawPipe();
    }
    ,
    drawPipe:function(){
        for(var i =0 ; i< pipeGroup.length;i++){
            this.addChild(pipeGroup[i]);
        }
    },
    removePipe:function(){
        for(var i =0 ; i< pipeGroup.length;i++){
            pipeGroup[i].removeFromParent();
        }
        if (pipeGroup[0].way==3 && pipeGroup[1].way ==1 &&pipeGroup[2].way%2==1&& pipeGroup[3].way==1 && pipeGroup[4].way==3 && pipeGroup[5].way%2 ==1&& pipeGroup[6].way==1 &&pipeGroup[7].way==3 && pipeGroup[8].way%2==1&& pipeGroup[9].way%2==1 &&pipeGroup[10].way==3&& pipeGroup[11].way%2==0 &&pipeGroup[12].way==1&&pipeGroup[13].way%2==1 &&!over){
            this.addChild(winBoard);
            console.log("win!!!");
            over =true;
            cc.audioEngine.stopMusic();
            cc.audioEngine.playEffect("res/sounds/win.wav",false);
        }
    },

    addMustPipe:function(){
        pipeGroup[0] = new Pipe(res.pipeArc);
        pipeGroup[0].attr({
            x:140,
            y:size.height/2+20,
            scale:0.7
        });
        this.addChild(pipeGroup[0]);

        pipeGroup[1] = new Pipe(res.pipeArc);
        pipeGroup[1].attr({
            x:180,
            y:size.height/2+90,
            scale:0.7
        });
        this.addChild(pipeGroup[1]);

        pipeGroup[2] = new Pipe(res.pipeLine);
        pipeGroup[2].attr({
            x:280,
            y:size.height/2+110,
            scale:0.7
        });
        this.addChild(pipeGroup[2]);

        pipeGroup[3] = new Pipe(res.pipeCircle);
        pipeGroup[3].attr({
            x:370,
            y:size.height/2+65,
            scale:0.7
        });
        this.addChild(pipeGroup[3]);

        pipeGroup[4] = new Pipe(res.pipeCircle);
        pipeGroup[4].attr({
            x:310,
            y:size.height/2-10,
            scale:0.7
        });
        this.addChild(pipeGroup[4]);

        pipeGroup[5] = new Pipe(res.pipeLine);
        pipeGroup[5].attr({
            x:400,
            y:size.height/2 -50,
            scale:0.7
        });
        this.addChild(pipeGroup[5]);

        pipeGroup[6] = new Pipe(res.pipeCircle);
        pipeGroup[6].attr({
            x:480,
            y:size.height/2-95,
            scale:0.7
        });
        this.addChild(pipeGroup[6]);

        pipeGroup[7] = new Pipe(res.pipeCircle);
        pipeGroup[7].attr({
            x:420,
            y:size.height/2-170,
            scale:0.7
        });
        this.addChild(pipeGroup[7]);

        pipeGroup[8] = new Pipe(res.pipeLine);
        pipeGroup[8].attr({
            x:505,
            y:size.height/2 - 215,
            scale:0.7
        });
        this.addChild(pipeGroup[8]);

        pipeGroup[9] = new Pipe(res.pipeLine);
        pipeGroup[9].attr({
            x:630,
            y:size.height/2 - 215,
            scale:0.7
        });
        this.addChild(pipeGroup[9]);

        pipeGroup[10] = new Pipe(res.pipeArc);
        pipeGroup[10].attr({
            x:730,
            y:size.height/2 - 198,
            scale:0.7
        });
        this.addChild(pipeGroup[10]);

        pipeGroup[11] = new Pipe(res.pipeLine);
        pipeGroup[11].attr({
            x:750,
            y:size.height/2 - 100,
            scale:0.7
        });
        this.addChild(pipeGroup[11]);

        pipeGroup[12] = new Pipe(res.pipeArc);
        pipeGroup[12].attr({
            x:770,
            y:size.height/2 - 15,
            scale:0.7
        });
        this.addChild(pipeGroup[12]);

        pipeGroup[13] = new Pipe(res.pipeLine);
        pipeGroup[13].attr({
            x:830,
            y:size.height/2,
            scale:0.7,
            scaleY:0.3,
        });
        this.addChild(pipeGroup[13]);

    },
    addNoisePipe:function(){
        pipeGroup[14] = new Pipe(res.pipeLine);
        pipeGroup[14].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+25-200,
            y:size.height/2 - 120,
            scale:0.7
        });
        this.addChild(pipeGroup[14]);

        pipeGroup[15] = new Pipe(res.pipeCircle);
        pipeGroup[15].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+60-200,
            y:size.height/2 - 210,
            scale:0.7
        });
        this.addChild(pipeGroup[15]);
        pipeGroup[16] = new Pipe(res.pipeLine);
        pipeGroup[16].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+105-200,
            y:size.height/2 - 120,
            scale:0.7
        });
        this.addChild(pipeGroup[16]);
        pipeGroup[17] = new Pipe(res.pipeArc);
        pipeGroup[17].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+120-200,
            y:size.height/2 - 20 ,
            scale:0.7
        });
        this.addChild(pipeGroup[17]);

        pipeGroup[18] = new Pipe(res.pipeLine);
        pipeGroup[18].attr({
            x:630-80,
            y:size.height/2 - 215+100,
            scale:0.7
        });
        this.addChild(pipeGroup[18]);

        pipeGroup[19] = new Pipe(res.pipeArc);
        pipeGroup[19].attr({
            x:730-80,
            y:size.height/2 - 198+100,
            scale:0.7
        });
        this.addChild(pipeGroup[19]);

        pipeGroup[20] = new Pipe(res.pipeLine);
        pipeGroup[20].attr({
            x:750 -80,
            y:size.height/2 - 100+100,
            scale:0.7
        });
        this.addChild(pipeGroup[20]);

    },
});

var tubeScene3 = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new tubeLayer3();
        this.addChild(layer);
    }
});
var Pipe = cc.Sprite.extend({
    onEnter:function(){
        this._super();
        this.addTouchListener();
    },
    way:0,
    ctor:function(imageURL){
        this._super(imageURL);
        this.way = 0;
    },
    onTouch:function(){
        this.way = (this.way +1)%4;
        this.rotation = (this.rotation + 90)%360;
    },
    addTouchListener:function(){
        this.touchListener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch,event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
                    target.onTouch();
                    console.log(target.x+" "+target.y);
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    }
})