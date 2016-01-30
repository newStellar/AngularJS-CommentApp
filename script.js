
var app = angular.module("glostar-comment-app",[]);

app.controller("myCtrl",function($scope,$http){

    $scope.commentEditEnable ={
        index: -1,
        status: false,
        msg : ""
    };

    $scope.userTag = {
        enable     : false,
        startIndex : -1,
    };


	

    $scope.commentList = [];

    $scope.friendList = ["Barak obama","Billgates","Shahrukh khan","john smith","will smith"];
    $scope.tempFriendList = ["Barak obama","Billgates","Shahrukh khan","john smith","will smith"];
   
    $scope.rowSize = 1;
    $scope.editCommentrowSize = 1;
    $scope.message = "";
    $scope.cmntLen  =1;
    $scope.hasSubMsg = [];
    $scope.testMsg = "boom";

    var rowLen = 62,tmpMsg;


    var getCommentsFromServer =function(){
    	$http({

    		method  : "GET",
    		url     : "comments.json",	
    	}).then(function(data){
    		console.log(JSON.stringify(data.data));
    		$scope.commentList = data.data;
    	},
    	function(){

    	});
		
    }
    getCommentsFromServer();
    var init = function(){

        for(var i=0;i<$scope.commentList.length;i++){
            $scope.hasSubMsg[i] = -1;
        }
    }

    $scope.checkCommentLength= function(len){

        if(len<=$scope.cmntLen)return true;
        return false;
    }
    $scope.getMsg =function(index){

        if($scope.hasSubMsg[index] == 0 )return $scope.commentList[index].msg;
        if($scope.commentList[index].msg.length <= $scope.cmntLen) {
            $scope.hasSubMsg[index] =0;
            return $scope.commentList[index].msg;
         }
        $scope.hasSubMsg[index] = 1;
        return $scope.commentList[index].msg.substr(0,5);

    }

    $scope.$watch("commentList",function(){

    });

    $scope.showFullMsg = function(index){

        $scope.hasSubMsg[index] = 0;
        console.log("ap");
    }
    $scope.testEnter =function(){
        var msg =$scope.message;
        console.log(tmpMsg+"__"+msg+"-->"+msg[msg.length-1]+msg.length);

        if($scope.userTag.enable){

            var str = msg.substr($scope.userTag.startIndex);
            console.log(str);
            $scope.tempFriendList = [];
            for(var i=0;i<$scope.friendList.length;i++){
                var st = $scope.friendList[i].toLowerCase();
                if(st.indexOf(str) > -1) $scope.tempFriendList.push($scope.friendList[i]);
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
        $scope.commentList.splice(0,0,newCmnt);



        if($scope.message.length <= $scope.cmntLen) $scope.hasSubMsg.splice(0,0,0);
        else $scope.hasSubMsg.splice(0,0,1);
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

        $scope.message = tmpMsg.slice(0,-1)+" <a href= '#'>"+$scope.friendList[index]+"</a>";
        $scope.userTag.enable =false;
    }
    

});
