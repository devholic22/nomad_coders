export const trending = (req, res) => res.render("home", {pageTitle: "Home"});
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const see = (req, res) => {
    return res.render("watch");
}
export const edit = (req, res) => {
    return res.render("edit");
}
export const deleteVideo = (req, res) => {
    return res.send("Delete Video");
}