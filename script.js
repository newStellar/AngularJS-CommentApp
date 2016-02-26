
var app = angular.module("glostar-comment-app",[]);

app.controller("myCtrl",function($scope,$http,$sce){

    $scope.commentEditEnable ={
        index   : -1,
        status  : false,
        msg     : "",
  		dbMsg   :  "",
  		emoList : []
    };

    $scope.userTag = {
        enable     : false,
        startIndex : -1,
    };
    $scope.emoNames = ["smiley","angry","blush","flushed","fearful","kissing_heart","sleepy","scream","sunglasses","stuck_out_tongue_winking_eye","wink", "rage", "innocent", "joy","persevere","relaxed","relieved","triumph","unamused","bicyclist","bikini","broken_heart","bear","confused","confounded","yum","trollface","beers","mask","thumbsup"];
    var msgWithTag =  false;
    var rowLen = 62, rowDiv,tmpMsg;

	
    var emoListBeforeAdd = [];
    $scope.commentList = [];
    $scope.friendList = ["Barak obama","Billgates","Shahrukh khan","john smith","will smith"];
    $scope.tempFriendList = ["Barak obama","Billgates","Shahrukh khan","john smith","will smith"];
   	$scope.cmntHtml = [];
    $scope.rowSize = 1;
    $scope.editCommentrowSize = 1;
    $scope.message = "";
    $scope.cmntLen  = 2;
    $scope.cmntMsgLen = 1000;
    $scope.showEmoBox = false;

    $scope.vanish =  function(){
    	$scope.showEmoBox = ($scope.showEmoBox == true)?false:true;
    }

    var getCommentsFromServer =function(){
    	$http({

    		method  : "GET",
    		url     : "comments.json",	
    	}).then(function(data){

    		console.log(JSON.stringify(data.data));
    		$scope.commentList = data.data;
    		for(var i=0; i<$scope.commentList.length ; i++){
    			$scope.cmntHtml.push($scope.getMsg(i));
    		}
    	},
    	function(){

    	});
		
    }
    getCommentsFromServer();
   

    var friendTag = function(msg){
    	
		for(var i=0 ;i<$scope.friendList.length;i++){
    		if( msg.indexOf($scope.friendList[i])> -1 )
    			msg = msg.replace($scope.friendList[i] , " <a href= '#'>"+$scope.friendList[i]+"</a> ");
	    			    		
    	}    	
    	return msg;
    }
    var convertMsgToEditView  = function(msg){

    	
    	while(1)
    	{
	    	var start = msg.indexOf("<span>");
	    	if(start == -1)break;



	    	for(var i=0 ;i<msg.length ;i++)console.log(msg[i]+" "+i);
			console.log(msg);


	    	var end = msg.indexOf("</span>")+7;
	    	var str =  msg.substring(start,end);


	    	console.log(start + "---" +end);
	    	
	    	start  = str.indexOf("s/");
	    	end = str.indexOf(".png");
	    	var str2 = str.substring(start+2, end ); 

	    	console.log(start + "---" +end +"---"+str.length + " -- "+str2);

	    	$scope.commentEditEnable.emoList.push(str2);
	    	str2 = "[["+str2+"]]";
	    	msg = msg.replace(str,str2);

	    	console.log(msg);
    	}
    	return msg;

    }
    var converMsgToPersonView = function(msg){

    	if($scope.commentEditEnable.status == true){

	    	var emo = $scope.commentEditEnable.emoList;
	    	for(var i =0; i <emo.length ; i++){

	    		var tmp = "[[" +emo[i] + "]]";
	    		var dbFormat = " <span> <img src = 'emojis/"+emo[i]+".png' height = '25' width= '25'> </span> " 
	    		msg= msg.replace(tmp,dbFormat);
	    	}
	    }
	    else
	    {	
	    	var emo = emoListBeforeAdd;
	    	for(var i =0; i <emo.length ; i++){

	    		console.log("--->> "+emo[i]);
	    		var tmp = "[[" +emo[i] + "]]";
	    		var dbFormat = " <span> <img src = 'emojis/"+emo[i]+".png' height = '25' width= '25'> </span> " 
	    		msg= msg.replace(tmp,dbFormat);
	    	}
	    }
    	return msg;
    }
    $scope.makeSrcforEmo = function(indx){

    	return "emojis/"+$scope.emoNames[indx] +".png";
    }
    $scope.checkCommentLength= function(len){

        if(len<=$scope.cmntLen)return true;
        return false;
    }
    $scope.getMsg =function(index){

        var flag; 
        
        if($scope.commentList[index].msg.length <= $scope.cmntMsgLen){
        	flag =false;
        }

        else flag = true;
        
        var ret = $scope.commentList[index].msg.substr(0,$scope.cmntMsgLen);
        ret = "<span>"+ret+"</span>"
        ret = $sce.trustAsHtml( friendTag(ret));
        
        var ob = {

        	sub  : ret,
        	hasSubMsg : flag, 
        	full : $sce.trustAsHtml( friendTag($scope.commentList[index].msg))
        }
        return ob;

    }


    $scope.testEnter =function(){

      
        var msg =$scope.message;

        //console.log(tmpMsg+"__"+msg+"-->"+msg[msg.length-1]+msg.length);

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

        
         tmpMsg = $scope.message;
    }

    $scope.$watch("message",function(a,b){

    	msg =a;
    	if(msg.length%rowLen == 0  || (Math.floor(msg.length/rowLen)> rowDiv )) {
            $scope.rowSize = (msg.length/rowLen)+1;
            rowDiv = Math.floor(msg.length/rowLen);
        }
    });
    $scope.addComment = function(author){

    	if($scope.message.length === 0)return;
    	//console.log($scope.message.length);
    	var msg = $scope.message;
    	msg =  friendTag(msg);
        
        var newCmnt = {
            author: author,
            msg   : converMsgToPersonView ($scope.message)
        }
        $scope.commentList.splice(0,0,newCmnt);


        var flag;
        if($scope.message.length <= $scope.cmntMsgLen) flag = false;
        else flag =true;
        
        var ob = {
        	full      :  $sce.trustAsHtml( converMsgToPersonView(msg) ) ,
        	sub       :  $sce.trustAsHtml(  converMsgToPersonView ( $scope.message.substr(0,$scope.cmntMsgLen) ) ),
        	hasSubMsg : flag
        }
        $scope.cmntHtml.splice(0,0,ob);
        $scope.message = "";
        
    }
    $scope.deleteComment = function (index){

        $scope.commentList.splice(index,1);

    }
    $scope.editComment =function(index,msg){

    	console.log(msg);
        $scope.commentEditEnable.status =true;
        $scope.commentEditEnable.index = index;
        $scope.commentEditEnable.dbmsg = msg;
        $scope.commentEditEnable.msg = convertMsgToEditView(msg);
    }
    $scope.checkEditStatus = function(index){

        if($scope.commentEditEnable.index ==index) return true;
        return false;
    }
    $scope.addEditedComment =function(){

        var indx = $scope.commentEditEnable.index;
        $scope.commentList[indx].msg = converMsgToPersonView ( $scope.commentEditEnable.msg );
        $scope.cmntHtml[indx].full = $sce.trustAsHtml(converMsgToPersonView ( $scope.commentEditEnable.msg ));
        $scope.commentEditEnable.status = false;
        $scope.commentEditEnable.index =-1;

        
    }
    $scope.getSuggestion =function(index){

        $scope.message = tmpMsg.slice(0,-1)+" "+$scope.friendList[index];
        $scope.userTag.enable =false;
    }
    $scope.addEmoInMsg = function(emo){
    	$scope.vanish();
    	emoListBeforeAdd.push(emo);
    	$scope.message = $scope.message+" [["+emo+"]] ";
    }
   
    
});


