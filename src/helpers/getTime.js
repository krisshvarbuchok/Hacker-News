
const getTime = (time) =>{
    const date = new Date();
    const minutes = Math.floor((date - (time * 1000)) / 1000 / 60);
    
    
        if(Math.floor(minutes / 60 / 24) > 1) return `${Math.floor(minutes / 60 / 24)} days ago`; 
        else if(Math.floor(minutes / 60 / 24) === 1) return `1 day ago`; 
        else if( Math.floor(minutes / 60) > 1) return `${Math.floor(minutes / 60)} hours ago`; 
        else if(Math.floor(minutes / 60) === 1) return `1 hour ago`;
        else if(Math.floor(minutes / 60) < 1 && minutes >= 1) return `${Math.floor(minutes)} minutes ago`;
        else if(minutes < 1) return 'less than a minute ago';
        else return 'Error';
     
}
export default getTime;