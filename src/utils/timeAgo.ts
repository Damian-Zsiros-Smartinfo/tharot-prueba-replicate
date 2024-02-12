import moment from "moment";
export function timeAgo(dateString: string): string {
  return moment(dateString).fromNow(true);
}
