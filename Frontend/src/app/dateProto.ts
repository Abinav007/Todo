interface Date 
{
    toFormat:()=>String;
    toTimeFormat:()=>String;
}

Date.prototype.toFormat = function() {
    let monthNames =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep", "Oct","Nov","Dec"];
    let day = this.getDate();
    let monthIndex = this.getMonth();
    let monthName = monthNames[monthIndex];
    let year = this.getFullYear();
    return `${day} ${monthName} ${year}`;  
}
Date.prototype.toTimeFormat = function() {
    let monthNames =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep", "Oct","Nov","Dec"];
    let day = this.getDate();
    let monthIndex = this.getMonth();
    let monthName = monthNames[monthIndex];
    let year = this.getFullYear();
    let hour = this.getHours();
    let minute = this.getMinutes();
    console.log("Minutes"+minute);
    let mode = hour > 12 ? 'PM' : 'AM';
    console.log(hour);
    return `${day} ${monthName} ${year} ${hour%12}:${minute} ${mode}`;
}