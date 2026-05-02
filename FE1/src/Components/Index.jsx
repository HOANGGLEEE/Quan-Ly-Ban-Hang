import React, { useEffect } from 'react';
import '../style/all.min.css';

const Index = () => {
    useEffect(() => {
      const script = document.createElement("script");
      script.src = "/src/main.jsx";
      script.crossOrigin = "anonymous";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }, []);

    return (
      <>
    <div id="root"></div>
      </>
    );
};

export default Index;
