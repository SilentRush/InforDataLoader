import instance from './instance';

export const QuerySdata = (url,result, {success,failure} = {success:()=>{},failure:()=>{}}) => {
  instance.get(url)
    .then((response) => {
      result = [...result, ...response.data.$resources];
      if(response.data.$next){
        QuerySdata(response.data.$next,result,{success,failure});
      }else{
        success(result);
      }
    })
    .catch((error) => {
      failure(error);
    });
}

export const ProcessBatch = (url,feed,totalsize,batchsize,result, {success,failure, progress} = {success:()=>{},failure:()=>{},progress:()=>{}}) => {
  let currentfeed = feed.splice(0,batchsize);
  instance.post(url,{$resources:currentfeed})
    .then((response) => {
      result = [...result, ...response.data.$resources];
      progress((totalsize - feed.length)/totalsize * 100)
      if(feed.length != 0){
        ProcessBatch(url,feed,totalsize,batchsize,result,{success,failure,progress});
      }else{
        success(result);
      }
    })
    .catch((error) => {
      failure(error);
    });
}
