/**
 * Created by 95112 on 2018/4/8.
 */
var BackSprite = cc.Sprite.extend({
    onEnter:function(){
        this._super();
        this.addTouchListener();
    },
    backHome:function(){
        cc.director.runScene(new MenuScene());
    }
    ,
    addTouchListener:function(){
        this.touchListener = cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches:true,
            onTouchBegan:function(touch,event){
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if(cc.rectContainsPoint(target.getBoundingBox(),pos)){
                    target.backHome();
                    return true;
                }
                return false;
            }
        });
        cc.eventManager.addListener(this.touchListener,this);
    }
});