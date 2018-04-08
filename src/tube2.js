/**
 * Created by 95112 on 2018/4/4.
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
var tubeLayer2 = cc.Layer.extend({
    ctor:function(){
        this._super();
        pipeGroup = [];
        over =false;
        number=10;
        size = cc.director.getWinSize();
        var Board = new cc.MenuItemFont("恭喜过关，进入下一关",this.nextGame,this);
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
        cc.director.runScene(new tubeScene3());
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
        if (pipeGroup[0].way%2== 1 && pipeGroup[1].way== 2 && pipeGroup[2].way%2 == 0 && pipeGroup[3].way ==2  && pipeGroup[4].way%2== 0 && pipeGroup[5].way==1 && pipeGroup[6].way %2 == 1 && pipeGroup[7].way==2 && pipeGroup[8].way == 2 && pipeGroup[9].way== 1 && pipeGroup[10].way ==1 &&!over){
            this.addChild(winBoard);
            console.log("win!!!");
            over =true;
            cc.audioEngine.stopMusic();
            cc.audioEngine.playEffect("res/sounds/win.wav",false);
        }
    },

    addMustPipe:function(){
        pipeGroup[0] = new Pipe(res.pipeLine);
        pipeGroup[0].attr({
            x:170,
            y:size.height/2,
            scale:0.7
        });
        this.addChild(pipeGroup[0]);

        pipeGroup[1] = new Pipe(res.pipeArc);
        pipeGroup[1].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+5,
            y:size.height/2-20,
            scale:0.7
        });
        this.addChild(pipeGroup[1]);

        pipeGroup[2] = new Pipe(res.pipeLine);
        pipeGroup[2].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+25,
            y:size.height/2 - 120,
            scale:0.7
        });
        this.addChild(pipeGroup[2]);

        pipeGroup[3] = new Pipe(res.pipeCircle);
        pipeGroup[3].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+60,
            y:size.height/2 - 210,
            scale:0.7
        });
        this.addChild(pipeGroup[3]);
        pipeGroup[4] = new Pipe(res.pipeLine);
        pipeGroup[4].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+105,
            y:size.height/2 - 120,
            scale:0.7
        });
        this.addChild(pipeGroup[4]);
        pipeGroup[5] = new Pipe(res.pipeArc);
        pipeGroup[5].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+120,
            y:size.height/2 - 20 ,
            scale:0.7
        });
        this.addChild(pipeGroup[5]);
        pipeGroup[6] = new Pipe(res.pipeLine);
        pipeGroup[6].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+210,
            y:size.height/2 ,
            scale:0.7
        });
        this.addChild(pipeGroup[6]);

        pipeGroup[7] = new Pipe(res.pipeArc);
        pipeGroup[7].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+300,
            y:size.height/2 - 20,
            scale:0.7
        });
        this.addChild(pipeGroup[7]);

        pipeGroup[8] = new Pipe(res.pipeCircle);
        pipeGroup[8].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+360,
            y:size.height/2 -80 ,
            scale:0.7
        });
        this.addChild(pipeGroup[8]);

        pipeGroup[9] = new Pipe(res.pipeArc);
        pipeGroup[9].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+430,
            y:size.height/2 -20 ,
            scale:0.7
        });
        this.addChild(pipeGroup[9]);

        pipeGroup[10] = new Pipe(res.pipeLine);
        pipeGroup[10].attr({
            x: pipeGroup[0].x+pipeGroup[0].width+520,
            y:size.height/2  ,
            scale:0.7
        });
        this.addChild(pipeGroup[10]);








    }
});

var tubeScene2 = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new tubeLayer2();
        this.addChild(layer);
    }
});
