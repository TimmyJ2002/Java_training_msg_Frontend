import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportUtils {
  exportSelected(selectedData: any[], headerList: any[], newHeaderList: any[]) {
    let csvData = this.convertToCSV(selectedData, headerList, newHeaderList);
    let blob = new Blob(['\ufeff' + csvData], {type: 'text/csv;charset=utf-8;'});
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", "donation-reporting.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

// @ts-ignore
  convertToCSV(objArray, headerList, newHeaderList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';
    for (let index in newHeaderList) {
      row += newHeaderList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        if (array[i][head] === null)
          line += ',' + this.strRep(" - ");
        else if (head === "createdBy" || head === "approvedBy") {
          let username = array[i][head].username;
          line += ',' + this.strRep(username);
        } else {
          line += ',' + this.strRep(array[i][head]);
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  strRep(data: any) {
    if (typeof data == "string") {
      let newData = data.replace(/,/g, " ");
      return newData;
    } else if (typeof data == "undefined") {
      return "-";
    } else if (typeof data == "number") {
      return data.toString();
    } else {
      return data;
    }
  }
}
