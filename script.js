
var app = angular.module("glostar-comment-app",[]);

app.controller("myCtrl",function($scope){

    $scope.commentEditEnable ={
        index: -1,
        status: false,
        msg : ""
    };

    $scope.userTag = {
        enable     : false,
        startIndex : -1,
    };

    $scope.commentList = [{author: "Nahid hasan prodhan",msg :"hi !!!! , how are you all"},{author: "AKM Rezaul Alam",msg :"hello, friends. !! "},{author: "Arifur Rahman",msg :"ASP.net is fun !!"},{author: "Glostars",msg :"How do u like our pera"}]
    $scope.friendList = ["Barak obama","Billgates","Shahrukh khan","john smith","will smith"];
    $scope.tempFriendList = ["Barak obama","Billgates","Shahrukh khan","john smith","will smith"];
    $scope.mobile = "nexus 5";
    $scope.rowSize = 1;
    $scope.editCommentrowSize = 1;
    $scope.message = "";

    var rowLen = 62,tmpMsg;

    $scope.testEnter =function(){
        var msg =$scope.message;
        console.log(tmpMsg+"__"+msg+"-->"+msg[msg.length-1]+msg.length);

        if($scope.userTag.enable){
            var str = msg.substr($scope.userTag.startIndex);
            $scope.tempFriendList = [];
            for(var i=0;i<$scope.friendList.length;i++){
                if($scope.friendList[i].indexOf(str) > -1) $scope.tempFriendList.push($scope.friendList[i]);
            }
        }
        if(msg[msg.length-1] == '@'){

            $scope.userTag.enable =true;
            $scope.userTag.startIndex = msg.length;
        }
        if(tmpMsg!=null && msg[msg.length-2]!="@" &&tmpMsg[tmpMsg.length-1] == "@")$scope.userTag.enable =false;

        if(msg.length%rowLen == 0 ) {
            $scope.rowSize = (msg.length/rowLen)+1;
        }
         tmpMsg = $scope.message;
    }
    $scope.addComment = function(author){
        var newCmnt = {
            author: author,
            msg   : $scope.message
        }
        $scope.commentList.push(newCmnt);
        $scope.message = "";
    }
    $scope.deleteComment = function (index){
        $scope.commentList.splice(index,1);

    }
    $scope.editComment =function(index,msg){
        $scope.commentEditEnable.status =true;
        $scope.commentEditEnable.index = index;
        $scope.commentEditEnable.msg = msg;
    }
    $scope.checkEditStatus = function(index){
        if($scope.commentEditEnable.index ==index) return true;
        return false;
    }
    $scope.addEditedComment =function(){
        var indx = $scope.commentEditEnable.index;
        $scope.commentList[indx].msg = $scope.commentEditEnable.msg;
        $scope.commentEditEnable.status = false;
        $scope.commentEditEnable.index =-1;
    }
    $scope.getSuggestion =function(index){

        $scope.message = tmpMsg.slice(0,-1)+" "+$scope.friendList[index];
        $scope.userTag.enable =false;
    }
});
