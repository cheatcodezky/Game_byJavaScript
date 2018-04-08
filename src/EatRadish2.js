/**
 * Created by 95112 on 2018/4/2.
 */
/**
 * Created by 95112 on 2018/4/1.
 */
var rabbit1 = null;
var size1 = null;
var xStep = null;
var yStep = null;
var amountRadish2 = 15;
var cave = null;
var winBoard1 = null;
var EatRadishLayer2 = cc.Layer.extend({
    radishGroup:null,
    winBoard1:null,
    key:0,
    lose:null,
    timeout:10,
    timeoutLabel:null,
    ctor:function(){
        this._super();
        this.radishGroup = [];
        amountRadish2 = 15;

        var Board = new cc.MenuItemFont("恭喜全部过关,回到主菜单",this.nextGame,this);
        Board.fontsize1 = 33;
        winBoard1 =new cc.Menu(Board);

        var falseBoard = new cc.MenuItemFont("重新开始",this.restartGame,this);
        falseBoard.fontSize = 33;
        this.lose = new cc.Menu(falseBoard);


        var bgSprite = new cc.Sprite(res.grassBackground);
        size1 = cc.director.getWinSize();
        xStep = size1.width/15;
        yStep = size1.height/15;
        bgSprite.attr({
            x:size1.width/2,
            y:size1.height/2,
            scale:1.7
        });
        this.addChild(bgSprite);
        cc.audioEngine.playMusic("res/sounds/bgm1.wav",true);
        rabbit1 = new cc.Sprite(res.rabbitWalk);
        rabbit1.attr({
            x:50,
            y:50,
            scale:0.5
        });
        for(var i =0; i< amountRadish2;i++){
            this.addRandomRadish();
        }
        this.addCave();
        var backHome = new BackSprite(res.backHome);
        backHome.attr({
            x:size.width-backHome.width/5,
            y:size.height-backHome.height/5,
            scale:0.4
        });
        this.addChild(backHome);
        var falseBoard = new cc.MenuItemFont("重新开始",this.restartGame,this);
        falseBoard.fontSize = 33;
        this.lose = new cc.Menu(falseBoard);

        this.timeout = 10;
        this.timeoutLabel = cc.LabelTTF.create("剩余时间 : "+this.timeout,"Arial",30);
        this.timeoutLabel.attr({
            x:size.width/2,
            y:size.height-50,
        });
        this.addChild(this.timeoutLabel);
        this.schedule(this.timer, 1,this.timeout,1);


        this.scheduleUpdate();
        if('keyboard' in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.KEYBOARD,
                onKeyReleased:function(keyCode,event){
                    if (keyCode == cc.KEY.right && (rabbit1.x + xStep)<size1.width){
                        rabbit1.scaleX=0.5;
                        rabbit1.x = rabbit1.x + xStep;
                    }else if(keyCode == cc.KEY.left && (rabbit1.x - xStep)>0){
                        rabbit1.scaleX=-0.5;
                        rabbit1.x = rabbit1.x - xStep;
                    }else if(keyCode == cc.KEY.up && (rabbit1.y + yStep) <size1.height){
                        rabbit1.y = rabbit1.y + yStep;
                    }else if(keyCode == cc.KEY.down && (rabbit1.y - yStep) > 0){
                        rabbit1.y = rabbit1.y - yStep;
                    }
                }
            },this);
        }
        return true;
    },
    timer:function(){
        if(this.timeout>0) {
            this.timeout -= 1;
            this.timeoutLabel.setString("剩余时间 : " + this.timeout);
        }else if(this.key==0){
            rabbit.removeFromParent();
            rabbit = new cc.Sprite();
            this.addChild(this.lose);
            this.unscheduleUpdate(this.update());
        }
    }
    ,
    restartGame:function(){
        cc.director.runScene(new EatRadishScene2())
    },
    nextGame:function(){
        cc.director.runScene(new MenuScene());
    }
    ,
    update:function(){
        this.removerabbit1();
        this.drawrabbit1();
    }
    ,
    drawrabbit1:function(){
        this.addChild(rabbit1)
    },
    removerabbit1:function(){
        rabbit1.removeFromParent();
        for(var i = 0; i<this.radishGroup.length; i++){
            if (Math.abs(rabbit1.x - this.radishGroup[i].x)<xStep && Math.abs(rabbit1.y - this.radishGroup[i].y)<yStep){
                this.radishGroup[i].removeFromParent();
                this.radishGroup[i] = undefined;
                this.radishGroup.splice(i,1);
                i = i-1;
                amountRadish2 -= 1;
                cc.audioEngine.playEffect("res/sounds/eatRadish.wav",false);
            }
        }
        if(amountRadish2==0 && Math.abs(rabbit1.x - cave.x )<xStep&&Math.abs(rabbit1.y-cave.y)<yStep && this.key==0){
            this.addChild(winBoard1);
            rabbit1 = new cc.Sprite();
            this.key += 1;
            cc.audioEngine.stopMusic();
            cc.audioEngine.playEffect("res/sounds/win.wav",false);
        }
    },
    addRandomRadish:function(){
        var radish = new cc.Sprite(res.radish);
        radish.attr({
            x:radish.width/2 + size1.width/1.5*cc.random0To1(),
            y:radish.height/2 + size1.height/1.5*cc.random0To1(),
            scale:0.3
        });
        this.addChild(radish);
        this.radishGroup.push(radish);
    },
    addCave:function(){
        cave = new cc.Sprite(res.cave);
        cave.attr({
            x:cave.width/2 + size1.width/1.5*cc.random0To1(),
            y:cave.height/2 + size1.height/1.5*cc.random0To1(),
            scale:0.6
        });
        this.addChild(cave);
    }
}) ;
var EatRadishScene2 = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new EatRadishLayer2();
        this.addChild(layer);
    }
})