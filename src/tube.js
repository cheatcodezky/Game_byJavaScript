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
var tubeLayer = cc.Layer.extend({
    ctor:function(){
      this._super();
      pipeGroup = [];
      over =false;
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
        cc.director.runScene(new tubeScene2());
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
        if (pipeGroup[0].way%2==1 &&pipeGroup[1].way%2==1 &&pipeGroup[2].way%2==1&&pipeGroup[3].way%2==1&&pipeGroup[4].way%2==1 &&pipeGroup[5].way%2==1 &&!over){
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
        for(var i =1 ;i < 6;i++){
            pipeGroup[i] = new Pipe(res.pipeLine);
            pipeGroup[i].attr({
                x: pipeGroup[i-1].x+pipeGroup[i-1].width+30,
                y:size.height/2,
                scale:0.7
            });
            this.addChild(pipeGroup[i]);
        }

    }
});

var tubeScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new tubeLayer();
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
        cc.audioEngine.playEffect("res/sounds/puzzleMusic.wav",false);
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