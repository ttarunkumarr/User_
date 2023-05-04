import { getDownloadURL, listAll, ref, getMetadata, deleteObject } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { storage } from "../config";
import "./Table.css";
import Navbar from "../Components/Navbar";
import Skill from "../Components/skills";

function Table() {
  const location = useLocation();
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
console.log(location.state)
  useEffect(() => {
    async function fetchFiles() {
      try {
        const { name, quantity } = location.state;
        const storageRef = ref(storage, `files/${name}/${quantity}`);
        const { items } = await listAll(storageRef);
       
        const downloadURLsPromises = items.map(async (item) => {
          const downloadURL = await getDownloadURL(item);
          const metadata = await getMetadata(item);
       
          const uploadTime = metadata.timeCreated;
          const skill=metadata.customMetadata;
          console.log(skill)
          const date = new Date(uploadTime.replace("Z", ""));
          const daysAgo = Math.round((new Date() - date) / 86400000);
          return {
            name: item.name,
            downloadURL,
            uploadTime: `${daysAgo} days ago`,
            skill
          };
        });

        const downloadURLs = await Promise.all(downloadURLsPromises);
        setFiles(downloadURLs);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error fetching files");
        setIsLoading(false);
      }
    }

    if (location.state) {
      fetchFiles();
    }
  }, [location.state]);

  if (!location.state) {
    return <Redirect to="/main" />;
  }

  if (isLoading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  
  return (
    <div className="Main-table">
      <Navbar
        backgroundColor="#333"
        textColor="#fff"
        buttons={[]}
        onClick={() => {}}
      />
      <div className="wrapper-table">
        <div className="Table-con">
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Developer Skills</th>
                <th>Uploaded</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={file.name}>
                  <td>{index + 1}</td>
                  <td><Skill skill={file.skill?.skills}/></td>

                <td>{file.uploadTime}</td>
                <td>
                <a href={file.downloadURL} download={file.name} className="download-btn">
  Download <span className="pdf-icon"></span>

</a>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Table;
