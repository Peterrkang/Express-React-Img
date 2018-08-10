import React, { Fragment, Component } from "react";
import ReactDropzone from "react-dropzone";
import request from "superagent";
import styles from "../styles.module.css";

class App extends Component {
  state = { files: [], mergedImage: null };

  handleResetClick = () => {
    this.setState({ files: [], mergedImage: null });
  };

  onDrop = acceptedFiles => {
    let files = [...this.state.files].concat(acceptedFiles);
    if (files.length > 4) {
      alert("Only first 4 images will be merged.");
      files = files.slice(0, 4);
    }

    let formData = new FormData();
    files.forEach(file => {
      formData.append(file.name, file);
    });

    request
      .post("http://localhost:3000/upload")
      .send(formData)
      .end((err, res) => {
        if (err) return err;
        this.setState({
          files,
          mergedImage: res.text
        });
      });
  };

  renderMergedImage() {
    const { mergedImage } = this.state;
    return (
      mergedImage && (
        <Fragment>
          <h3>Merged Image</h3>
          <img src={mergedImage} className={styles.mergedImage} />
          <div>
            <button onClick={this.handleResetClick}>Merge New Image</button>
          </div>
        </Fragment>
      )
    );
  }

  renderDropZone() {
    return this.state.files.length < 4 ? (
      <ReactDropzone
        accept="image/*"
        onDrop={this.onDrop}
        className={styles.dropZone}
      >
        Drop images here!
      </ReactDropzone>
    ) : (
      <h3>Maximum Amount of Images!</h3>
    );
  }

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.wrapper}>
          <h2>Stitch Images</h2>
          {this.renderDropZone()}
          {this.renderMergedImage()}
        </div>
      </div>
    );
  }
}

export default App;
