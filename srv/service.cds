using { proj_schema as my } from '../db/schema';



service PanApproval {
 entity PAN_Details_APR as projection on my.PAN_Details;
 entity PAN_WEB_EVENT_APR as projection on my.PAN_WEB_EVENT;
 entity PAN_TYPE_APR as projection on my.PAN_TYPE;
 entity PAN_vendor_data_APR as projection on my.PAN_vendor_data;
 entity PAN_vendor_response_APR as projection on my.PAN_vendor_response; 
 entity PAN_PAYMENT_TERM_DETAILS_APR as projection on my.PAN_PAYMENT_TERM_DETAILS;
 entity PAN_PRICE_DETAILS_APR as projection on my.PAN_PRICE_DETAILS;
 entity PAN_WORKFLOW_HISTORY_APR as projection on my.PAN_WORKFLOW_HISTORY;
 entity PAN_attachments_APR as projection on my.PAN_attachments;
 entity PAN_Payment_Method_Drop_APR as projection on my.PAN_Payment_Method_Drop;
 entity PAN_Comments_APR as projection on my.PAN_Comments;
 entity vendorTaxDetails_APR as projection on my.vendorTaxDetails;
  function sendforapproval(data:String) returns LargeString;
 function InsertData(ID:String) returns String;
 function finalApprove(data:String) returns String;
 function getData(ID:String) returns String;
 function switch_control(ID:String) returns String;
 function getuser(ID:String) returns String;
 function Reject(data:String) returns String;
 function getcomments(ID:String) returns String;
 //from 46 to 53 function are not used.
 //below function import used to extract the data from ariba and insert it into the database.
//  function postUserDataDate(userName:String,projectid:String) returns String;
function postUserDataDate() returns String;
 
}