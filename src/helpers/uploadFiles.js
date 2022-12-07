export const uploadFiles = async (file) => {
    console.log("Inicio de guardado")
    const cloudinaryURL = "https://api.cloudinary.com/v1_1/davo29zou/image/upload";
    const formData = new FormData();
    formData.append("upload_preset", "journal-app");
    formData.append("file", file)

    try {
        const res = await fetch(cloudinaryURL, {
            method: "POST",
            body: formData
        })
        if(!res) throw new Error("No se pudo subir la imagen");
        const cloudinaryResponse = await res.json();
        console.log("[URL_CLOUDINARY_IMAGE]", cloudinaryResponse.secure_url)
        return cloudinaryResponse.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}