export default function({ store, redirect	 }) {
    let location = store.getters["location/location"];
    if(location === null || location === undefined){
        redirect(301,"/loader");
    }
}