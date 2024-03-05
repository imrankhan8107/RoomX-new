import React from "react";

function DemoApp() {
  return (
    <div className="container">
      <div className="text-3xl font-bold mb-10 mx-20">Analytics</div>
      <iframe
        title="BI1"
        width="1200"
        height="541.25"
        style={{ margin: "3rem" }}
        // className="w-screen h-screen m-4"
        src="https://app.powerbi.com/reportEmbed?reportId=a7de28c6-79f1-4de2-a54d-17f808d50522&autoAuth=true&ctid=e85f2c00-2730-4ca5-b8d8-609b15bd4746"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
}

export default DemoApp;
