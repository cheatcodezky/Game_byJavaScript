/**
 * Created by 95112 on 2018/4/8.
 */
var MenuLayer = cc.Layer.extend({
    size:null,
    ctor:function(){
        this._super();
        this.size = cc.director.getWinSize();
        var bgSprite = new cc.Sprite(res.menu);
        bgSprite.attr({
            x:this.size.width/2,
            y:this.size.height/2,
            scaleY:0.38,
            scaleX:0.62
        });
        this.addChild(bgSprite);
        var s0 = new Selection(res.puzzleSelection);
        s0.attr({
            x:this.size.width/3,
            y:this.size.height/3,
            key:0
        });
        this.addChild(s0);
        var info0 = new cc.LabelTTF.create("将图片拼成正方形","Arial",15);
        info0.attr({
            x:s0.x,
            y:s0.y - 100
        });
        info0.setColor(cc.color(0,0,0,0));
        this.addChild(info0);
        var s1 = new Selection(res.tubeSelection);
        s1.attr({
            x:this.size.width/3*2,
            y:this.size.height/3*2,
            scale:0.95,
            key:1
            });
        this.addChild(s1);
        var info1 = new cc.LabelTTF.create("将左右水管阀门相连接","Arial",15);
        info1.attr({
            x:s1.x,
            y:s1.y - 100
        });
        info1.setColor(cc.color(0,0,0,0));
        this.addChild(info1);
        var s2 = new Selection(res.eatRadishSelection);
        s2.attr({
            x:this.size.width/3,
            y:this.size.height/3*2,
            key:2
        });
        this.addChild(s2);
        var info2 = new cc.LabelTTF.create("在10秒内，吃掉所有萝卜","Arial",15);
        info2.attr({
            x:s2.x,
            y:s2.y - 100,
        });
        info2.setColor(cc.color(0,0,0,0));
        this.addChild(info2);
        var s3 = new Selection(res.jumpSelection);
        s3.attr({
            x:this.size.width/3*2,
            y:this.size.height/3,
            scale:0.8,
            key:3
        });
        this.addChild(s3);
        var info3 = new cc.LabelTTF.create("吃掉所有萝卜，并不要让兔子坠落悬崖","Arial",15);
        info3.attr({
            x:s3.x,
            y:s3.y - 100
        });
        info3.setColor(cc.color(0,0,0,0));
        this.addChild(info3);

    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function(){
      this._super();
      var layer = new MenuLayer();
      this.addChild(layer);
    },
})

var Selection = cc.Sprite.extend({
    key:0,
    onEnter:function(){
      this._super();
      this.addTouchListener();
    },

    onTouch:function(){
        if (this.key == 0){
            cc.director.runScene(new PuzzleScene());
            console.log("0");
        }else if(this.key == 1){
            cc.director.runScene(new tubeScene());
            console.log("1");
        }else if(this.key == 2){
            cc.director.runScene(new EatRadishScene())
            console.log("2");
        }else if(this.key == 3){
            cc.director.runScene(new JumpRabbitScene());
            console.log("3");
        }else{
            console.log("null");
        }
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
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    }

})