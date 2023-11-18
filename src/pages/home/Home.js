import React, { useState, useEffect } from 'react';
import anh_logo_1 from '../../../src/assets/images/anh_logo_1.jpg';
import Post from './components/Post';
import PostItem from './components/PostItem';
import { ToastContainer, toast } from 'react-toastify';
import Editor from './components/Editor';

function Home() {
  
 
  const [ispost, setIspost] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('login')) {
      toast.success('Đăng nhập thành công');
      localStorage.removeItem('login');
      
      
    }

  }, []);

  let anh=''
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.profileImageUrl) {
    anh=user.profileImageUrl;
  }
  else{
    anh=anh_logo_1;
  }
 
const openInput=()=>{
  setIspost(!ispost);
}
 

  
  const post = [
    {
      user: {
        name: 'John Doe',
        avatar: anh,
      },
      content: `<p>aaaaaaa</p>
     `,
      image: anh,
      likes: 42,
    },
    {
      user: {
        name: 'John Doe',
        avatar: anh,
      },
      content: `<p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>`,
      image: anh,
      likes: 42,
    },
    {
      user: {
        name: 'John Doe',
        avatar: anh
      },
      content: `<p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>`,
      image: anh,
      likes: 42,
    },
  ];
  return (
    <>
      <div className="home-page">
      <button className="btn btn-primary" onClick={openInput}>Đăng</button>
      {ispost && <div className=""> <Editor cancel={openInput} /></div>}
      {post.map((post, index) => {
        return (
          <PostItem
            key={index}
            user={post.user}
            content={post.content}
            image={post.image}
            likes={post.likes}
            index={index}
          />
        );
      })}
      <ToastContainer />
      </div>
    </>
  );
}

export default Home;
