import axios from '../../utils/axios'

export default async function handle(req:any, res:any) {
  const params = req.query;
  console.log(typeof params)
  const result = await axios.get('https://wss.cloud.tencent.com/ssl/api/common/dv_available',{ params })
  res.send(result)
}
