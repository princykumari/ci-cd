const cds = require('@sap/cds')
const { PAN_Details_APR } = cds.entities('PanApproval');




module.exports = cds.service.impl(async function () {
  console.log("======================================================")
  console.log(Object.keys(cds.entities));
  // var userName = req.data.userName;

  // this.on('postUserDataDate',async (req)=>{
  // debugger

  var no_of_docs = [];
  var tsk_doc_id = "";
  var tsk_id = "";

  var userName = "puser1";
  var password = "PasswordAdapter1"
  const getcall = await cds.connect.to('cdsrc');
  // cur_pro_id = req.data.projectid;
  cur_pro_id = "WS78209673";
  var project_id = cur_pro_id;
  // debugger
  var number_of_docs = "";
  try {
    getcall.destination.headers.url = 'https://openapi.au.cloud.ariba.com/api/sourcing-project-management/v2/prod/projects/' + project_id + '/documents';
    getcall.destination.headers.query = 'user=' + userName + '&passwordAdapter=' + password + '&realm=' + getcall.destination.realm + '&apikey=' + getcall.destination.pro_apikey;
    // getcall.destination.headers.query = 'user=puser1&passwordAdapter=PasswordAdapter1&realm=PEOLSOLUTIONSDSAPP-T&apikey=gG0vXlJzZg6UzopL6lRvVjBwQKTbR0WJ';
    getcall.destination.headers.basis = 'Basic ' + getcall.destination.pro_base;
    number_of_docs = await getcall.tx().get('/ariba_iflow');
  } catch (error) {
    console.log(error);
    return "no data for this user";

  }
  // =====================================================
  if (number_of_docs.payload.length != 0) {
    // debugger;
    console.log(number_of_docs.payload.length)

    for (let k = 0; k < number_of_docs.payload.length; k++) {
      if (number_of_docs.payload[k].type == 'RFx' && number_of_docs.payload[k].status != 'Draft') {

        let doc_id = number_of_docs.payload[k].internalId;
        // let doc_id = "Doc1007341724";

        getcall.destination.headers.url = 'https://openapi.au.cloud.ariba.com/api/sourcing-event/v2/prod/events/' + doc_id;
        getcall.destination.headers.query = 'realm=' + getcall.destination.realm + '&user=' + userName + '&passwordAdapter=' + password + '&apikey=' + getcall.destination.evt_apikey;
        getcall.destination.headers.basis = 'Basic ' + getcall.destination.evt_base;
        project_currency = await getcall.tx().get('/ariba_iflow');

        console.log("hj");





        // ====================================================================================================
        function returndate(input) {
          let a = input;
          let [y, m, d] = a.split('-');
          let jumbleDate = d + "/" + m + "/" + y
          return jumbleDate
        }

        if (project_currency != "") {
          // debugger
          if ("currency" in project_currency) {
            proj_currency = `${project_currency.currency}`;
          }
          if ("openDate" in project_currency) {
            web_publish_date = project_currency.openDate;
            const dateObj = new Date(web_publish_date);
            web_pub_date = project_currency.openDate;
            web_publish_date = dateObj.toISOString().split('T')[0];
            web_publish_date1 = returndate(web_publish_date);
          }
          if ("createDate" in project_currency) {
            create_date = project_currency.createDate;
            const dateObj1 = new Date(create_date);
            create_date = dateObj1.toISOString().split('T')[0];
            create_date1 = returndate(create_date)
          }
          if (web_publish_date != "" && create_date != "") {
            // debugger
            var formatdate = new Date(web_publish_date);
            var formatdate1 = new Date(create_date);
          }
          var diffTime = Math.abs(formatdate - formatdate1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          final_date = diffDays + " days";  // 0 days
        }
        else {
          

          proj_currency = "";
          web_publish_date = "";
        }
        console.log("push stateme")
        no_of_docs.push({
          doc_id: number_of_docs.payload[k].internalId,
          icon_type: number_of_docs.payload[k].iconType,
          status: number_of_docs.payload[k].status,
          web_pub_date: web_pub_date,
          web_publish_date: web_publish_date1,
          create_date: create_date1,
          final_date: final_date,
        })
        console.log("no_of_docs line", no_of_docs);
        // =================================================================
        var obj = "pendingAwardApprovalTaskId";
          
        if(obj in project_currency){
        debugger;
        tsk_id = project_currency.pendingAwardApprovalTaskId;
        tsk_doc_id = doc_id;
        console.log(tsk_doc_id)
        pro_ind = 1;
      }
    }
  }
  console.log(tsk_doc_id)
  console.log(tsk_id)
  const task_ids = await SELECT.from(PAN_Details_APR).where ({ ProjectId : cur_pro_id});
  if(task_ids.length != 0){
      for(let i = 0;i<task_ids.length;i++){
        if(tsk_id == task_ids[i].task_id){
          tsk_ind = 1;
          return_doc = task_ids[i].PAN_Number;
        }
      }
    }









    
      
    
  }
})

