import React, {useState} from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import {format} from 'date-fns';
import exifr from "exifr";
import './Upload.css';
import { sendFile } from "../../API";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);



/* Må legge til resten av prosjektene og kategorier som er ønsket. 
    Til jeg finne ut hvordan man kan hente dem fra databasen inn i listen...??
*/

const Opplastning = () => {
  const [files, setFiles] = useState([]);

  const fileTypesAccepted = ["image/jpeg", "image/jpg", "image/png"];

  const userFile = {
    latitude: "",
    longitude: "",
    GPSAltitude: "",
    GPSImgDirection: "",
    imageName: "",
    imageType: "",
    captureDate: String,
  };

  const handleSubmit = async (event) => {
    //Henter svarene fra formen
    const formData = new FormData(event.target);
    //error handler(?)
    event.preventDefault();
    //Putter inn fil fra filepond inn i bildefil også henter ut denne
    formData.set("bildefil", files[0].file);
    const imageFile = formData.get("bildefil");

    // Lagrer alt som trengs fra Form og bildefil
    // For å findre at filename vil være det samme ved å bruke mobilen til og ta bilder
    // bruker jeg crypto til å generere et navn til de gjeldende bildene
    if(imageFile.name === "image.jpg") {
      userFile.imageName = "kamera-"+ Date.now() + ".jpeg";
    }else {
      userFile.imageName = imageFile.name;
    }

    console.log(userFile.imageName);

    userFile.imageType = imageFile.type;

    //Lagrer dato fra lastModifiedDate -> er den nøyaktig nok??
    // Safari & IE browsers do not support the date format "yyyy-mm-dd"
    userFile.captureDate = format(imageFile.lastModified, 'dd/MM/yyyy');

    console.log(userFile.captureDate); 

    //Sjekke om det finnes gps-verdier i filen
    let exifrOutput = await exifr.gps(imageFile).catch(console.error)
    
    //Henter EXIFR verdiene fra funksjonen som parser
    if (exifrOutput != null){
      userFile.latitude = (await exifr.gps(imageFile)).latitude;
      userFile.longitude = (await exifr.gps(imageFile)).longitude;
      //må hente ut disse for så å hente ut verdiene fra arrayen
      const gpsAlt = await exifr.parse(imageFile, ["GPSAltitude"]);
      // Kompassretning 
      const gpsDirection = await exifr.parse(imageFile, ["GPSImgDirection"]);

      userFile.GPSAltitude = gpsAlt.GPSAltitude;
      userFile.GPSImgDirection = gpsDirection.GPSImgDirection;

    } else {
      console.log("Det finnes ikke ");

      // Sjekke hvilket prosjekt det er
      if (formData.get("prosjekt") === "E6 Kvithammar - Åsen") {
        const kvithamCoord = [63.490445, 10.873416];

        userFile.latitude = kvithamCoord[0];
        userFile.longitude = kvithamCoord[1];
      }
      if(formData.get("prosjekt") === "E39 Mandal") {
        const mandalCoord = [58.028566, 7.523384];

        userFile.latitude = mandalCoord[0];
        userFile.longitude = mandalCoord[1];
      }
    }

    formData.append("imageType", userFile.imageType);
    formData.append("imageName", userFile.imageName);
    formData.append("latitude", userFile.latitude);
    formData.append("longitude", userFile.longitude);
    formData.append("GPSAltitude", userFile.GPSAltitude);
    formData.append("GPSImgDirection", userFile.GPSImgDirection);
    formData.append("captureDate", userFile.captureDate);

    // Sletter filepond som er tom
    formData.delete("filepond");

    console.log("Structure of formdata" + [...formData]);

    //Sends userFile to API -> DB
    try {
      await sendFile(formData);
      alert("Informasjonen har blitt lastet opp");
      
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };


  return (
    <Form
      onSubmit={handleSubmit}
      className="body"
    >
        <h3 className="form-title">Opplastning av bilder</h3>
      <FormGroup>
        <Label className="form-label" for="prosjekt">Prosjekt</Label>
        <Input
          type="select"
          name="prosjekt"
          id="prosjekt"
          placeholder="velg prosjekt"
        >
          <option>E6 Kvithammar - Åsen</option>
          <option>E39 Mandal</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label className="form-label" for="parsell">Parsellnummer</Label>
        <Input
          type="number"
          name="parsell"
          id="parsell"
          placeholder="Parselnummer"
        />
      </FormGroup>
      <FormGroup>
        <Label className="form-label" for="profilnr">Profilnummer</Label>
        <Input
          type="number"
          name="profilnr"
          id="profilnr"
          placeholder="Profilnummer"
        />
      </FormGroup>
      <FormGroup>
        <Label className="form-label" for="objektnr">Objektnummer</Label>
        <Input
          type="number"
          name="objektnr"
          id="objektnr"
          placeholder="Objektnummer"
        />
      </FormGroup>
      <FormGroup>
        <Label className="form-label" for="kategori">Kategori</Label>
        <Input type="select" name="kategori" id="kategori" multiple>
          <option>Boring</option>
          <option>Elektro</option>
          <option>Fjellsikring</option>
          <option>Fundamentering</option>
          <option>Geomatikk</option>
          <option>Konstruksjon</option>
          <option>Markedsbilder</option>
          <option>Riving og sanering</option>
          <option>Spregning</option>
          <option>Tunnel</option>
          <option>Vann og avløp</option>
          <option>Veg</option>
          <option>Annet</option>
        </Input>
        <FormText color="muted">
          PC: Velg flere kategorier ved å holde inne "command" eller "Alt" på tastaturet.
        </FormText>
      </FormGroup>
      <FormGroup>
          <Label className="form-label" for="kommentar">Kommentar</Label>
          <Input type="textarea" name="kommentar" id="kommentar"/>
      </FormGroup>
      <FormGroup>
        <FilePond 
         files={files}
         onupdatefiles={setFiles}
         name="filepond"
         id="filepond"
         acceptedFileTypes={fileTypesAccepted}
         labelIdle='Dra & Slippe filene eller <span class="filepond--label-action"> Bla Gjennom </span>'
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" required /> Godta at Hæhre kan bruke bildene *
        </Label>
      </FormGroup>
      <div className="button-form">
        <Button type="submit" color="info" >
            Last opp
        </Button>
      </div>
    </Form>
  );
};

export default Opplastning;
