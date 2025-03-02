import { useState } from "react";
import { Link } from "react-router-dom";

export default function RajoutInfos() {
  const [formData, setFormData] = useState({
    email: "",
    tel: "",
    parti: "",
    slogan: "",
    colors: ["#000000", "#000000", "#000000"],
    image: null,
  });

  const apiUrl = "https://api.example.com/submit"; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleColorChange = (index, value) => {
    const newColors = [...formData.colors];
    newColors[index] = value;
    setFormData({ ...formData, colors: newColors });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("email", formData.email);
    data.append("tel", formData.tel);
    data.append("parti", formData.parti);
    data.append("slogan", formData.slogan);
    formData.colors.forEach((color, index) => {
      data.append(`color${index + 1}`, color);
    });
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const result = await response.json();
      console.log("Données envoyées avec succès :", result);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="cadre">
      <h1>Informations complémentaires</h1>
      <form onSubmit={handleSubmit}>
        Email <br />
        <input type="email" name="email" placeholder="Entrez votre mail" value={formData.email} onChange={handleChange} required />

        <br /> Téléphone <br />
        <input type="tel" name="tel" placeholder="Entrez votre numéro de téléphone" value={formData.tel} onChange={handleChange} required />

        <br /><br /> Nom du parti politique <br />
        <textarea name="parti" placeholder="" value={formData.parti} onChange={handleChange} required />

        <br /><br /> Slogan <br />
        <textarea name="slogan" placeholder="Cherchez à attirer l'attention de l'électeur" value={formData.slogan} onChange={handleChange} required />

        <br /><br /> Photo <br />
        <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />

        <br /><br /> Choisissez les trois couleurs de votre parti <br />
        {formData.colors.map((color, index) => (
          <input key={index} type="color" value={color} onChange={(e) => handleColorChange(index, e.target.value)} />
        ))}

        <br /><br />
        <Link to="/Enregistrement">
        <button type="submit" className="linkButton">Valider</button></Link>
      </form>
    </div>
  );
}
 