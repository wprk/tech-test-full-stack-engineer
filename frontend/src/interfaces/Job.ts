import moment from "moment";

export enum JobStatus {
  NEW = 'new',
  ACCEPTED = "accepted",
  DECLINED = "declined"
}

export default interface Job {
  id: number
  category_id: number
  contact_name: string
  contact_email: string
  contact_phone: string
  created_at: moment.Moment
  description: string
  price: number
  status: JobStatus
  suburb_id: number
  updated_at: moment.Moment|null
}