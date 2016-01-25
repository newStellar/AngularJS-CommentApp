
var app = angular.module("glostar-comment-app",[]);

app.controller("myCtrl",function($scope){

    $scope.commentEditEnable ={
        index: -1,
        status: false,
        msg : ""
    };
    $scope.commentList = [{author: "Nahid hasan prodhan",msg :"hi !!!! , how are you all"},{author: "AKM Rezaul Alam",msg :"hello, friends. !! "},{author: "Arifur Rahman",msg :"ASP.net is fun !!"},{author: "Glostars",msg :"How do u like our pera"}]
    $scope.mobile = "nexus 5";
    $scope.rowSize = 1;
    $scope.editCommentrowSize = 1;
    $scope.message = "";
    var rowLen = 62;

    $scope.testEnter =function(){
        var msg =$scope.message;
        console.log(msg+"-->"+msg[msg.length-1]+msg.length);

        if(msg.length%rowLen == 0 ) {
            $scope.rowSize = (msg.length/rowLen)+1;
        }
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
});
