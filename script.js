
var app = angular.module("glostar-comment-app",[]);

app.controller("myCtrl",function($scope){

    $scope.commentEditEnable ={
        index: -1,
        status: false,
        msg : ""
    };

    $scope.commentList = [{author: "Nahid hasan prodhan",msg :"hi !!!! , how are you all"},{author: "AKM Rezaul Alam",msg :"hello, friends. !! "},{author: "Arifur Rahman",msg :"ASP.net is fun !!"},{author: "Glostars",msg :"How do u like our pera"}]
    $scope.friendList = ["Barak obama","Billgates","Shahrukh khan","john smith","will smith"]
    $scope.mobile = "nexus 5";
    $scope.rowSize = 1;
    $scope.editCommentrowSize = 1;
    $scope.message = "";
    $scope.userTag = false;
    var rowLen = 62,tmpMsg;

    $scope.testEnter =function(){
        var msg =$scope.message;

        console.log(tmpMsg+"__"+msg+"-->"+msg[msg.length-1]+msg.length);
        if(msg[msg.length-1] == '@')$scope.userTag =true;

        if(tmpMsg!=null && tmpMsg[tmpMsg.length-1] == "@")$scope.userTag =false;
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
        $scope.userTag =false;
    }
});
