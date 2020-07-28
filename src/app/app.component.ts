import { Component } from '@angular/core';
import Post from './post.modal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlogBook';
  postList: Post[];
  post: Post;

  constructor(private sanitizer: DomSanitizer){
    this.post = new Post();

    //sample image post
    // let samplePostImage = new Post();
    // samplePostImage.postType = 'IMAGE';
    // samplePostImage.postValue='../assets/summy.jpg';
    
    //this.postList=[samplePostImage];
    this.postList=[];
  }

  //post text
  postText(){
    ///const post = new Post();
    //post.postValue="Hello World";

    //push for pushing into last
    //this.postList.push(this.post);

    //splice=using this we can add element to any position
    this.postList.splice(0,0, this.post);
    
    //Re Initialize
    this.post=new Post();
  }

  deletePost(itemIndex){
    this.postList.splice(itemIndex,1);
  }

  //post Image
  postImage(event){

    //it will give access to input element
    const refElement = event.target;
    const uploadedFile = refElement.files[0];
    
    let uploadedFileAsUrl = URL.createObjectURL(uploadedFile);

    uploadedFileAsUrl=this.sanitizer.bypassSecurityTrustResourceUrl(uploadedFileAsUrl);

    this.post.postType='IMAGE';
    this.post.postValue=uploadedFileAsUrl;
    this.postList.splice(0,0,this.post);
    this.post=new Post();

  }

  postVideo(event){

    const refElement = event.target;
    const uploadedFile = refElement.files[0];

    let uploadedFileAsUrl = URL.createObjectURL(uploadedFile);

    uploadedFileAsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(uploadedFileAsUrl);

    this.post.postType = 'VIDEO';
    this.post.postValue = uploadedFileAsUrl;
    this.postList.splice(0, 0, this.post);
    this.post = new Post();

  }


  //update like
  likeCount(item: Post){
    item.likeCount+=1;
  }

  subscribeCount(item: Post){
    item.subscribeCount+=1;
  }

  addComment(item:Post){
    item.commentList.push('thank you');
  }

}
