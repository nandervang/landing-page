import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/shadcn-io/marquee";
import { Play, Pause, Minus, Plus, X } from "lucide-react";
import { useMotionPreference } from "@/hooks/useMotionPreference";

interface Client {
  name: string;
  logo: string;
  alt: string;
  website?: string;
}

// Your requested companies with working logo sources
const clients: Client[] = [
  {
    name: "PostNord",
    logo: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ic2l0ZWhlYWRlci1sb2dvIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi43cmVtIiBoZWlnaHQ9IjIuNHJlbSIgdmlld0JveD0iMCAwIDE0MS43MyAyNi42NSIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJQb3N0Tm9yZCI+PHBhdGggZD0iTTEwOC44NCwxMy4zNWMwLDYuMzQtNS4xNyw5LTEwLDlTODksMTkuNzYsODksMTMuNjNjMC02LjI4LDUuMDgtOSwxMC05UzEwOC44NCw3LjI1LDEwOC44NCwxMy4zNVptLTYuNTYuMThhMy40LDMuNCwwLDEsMC02LjgsMGEzLjI5LDMuMjksMCwwLDAsMy40MiwzLjQxQTMuMjQsMy4yNCwwLDAsMCwxMDIuMjgsMTMuNTRabS04MywwYzAsNC44My0zLjMyLDguODItOC40OSw4LjgyYTYuNTQsNi41NCwwLDAsMS00LjY1LTEuNTd2NS44NkgwVjUuMTZINi4xN1Y2LjhhNi40Myw2LjQzLDAsMCwxLDUuMTEtMi4xOEMxNi40MSw0LjYyLDE5LjMxLDguNTgsMTkuMzEsMTMuNTRabS02LjUzLDBBMy4yNywzLjI3LDAsMCwwLDkuNCwxMEEzLjI4LDMuMjgsMCwwLDAsNiwxMy41NEEzLjI5LDMuMjksMCwwLDAsOS40LDE2Ljk1QTMuMjQsMy4yNCwwLDAsMCwxMi43OCwxMy41NFptMTAzLjY5LDAuMjdjMC0yLjU0LDEuNTQtMy4zMiwzLjYtMy4zMmE2LjU2LDYuNTYsMCwwLDEsMi4wOC4zTDEyMi4zLDUuMWEzLjkyLDMuOTIsMCwwLDAtMS40NS0uMThjLTMuNDUsMC00LjM4LDIuMTgtNC4zOCwyLjE4VjUuMTZIMTEwLjNWMjEuODRoNi4xN3YtOFpNMTQxLjczLDBWMjEuODRoLTYuMTZWMjAuMjFhNi40Myw2LjQzLDAsMCwxLTUuMTEsMi4xOGMtNS4xNCwwLTgtNC04LTguOTFzMy4zMi04LjgyLDguNDktOC44MmE2LjU0LDYuNTQsMCwwLDEsNC42NSwxLjU3di01Wm0tNiwxMy40OGEzLjI4LDMuMjgsMCwwLDAtMy40MS0zLjQxQTMuMjQsMy4yNCwwLDAsMCwxMjksMTMuNDdBMy40LDMuNCwwLDEsMCwxMzUuNzUsMTMuNDdaTTgxLjM1LDQuNjJjLTMuNiwwLTQuOSwyLjE4LTQuOSwyLjE4VjUuMTZINzAuMjlWMjEuODRoNi4xNlYxMy4yOWMwLTIuMTEuNzktMy4wOCwyLjY5LTMuMDhzMi4xOCwxLjU3LDIuMTgsMy41N3Y4LjA3aDYuMjJWMTEuNkM4Ny41NSw3LDg1LjM0LDQuNjIsODEuMzUsNC42MlpNNjQuMDcsMS40Mkg1Ny45VjIxLjg0aDYuMTZWMTAuMzZINjdsMi44MS01LjJINjQuMDdWMS40MlpNNTAuMjYsMTEuMjFjLTItLjMtMi44Ny0wLjMtMi44Ny0xLjA5czAuODEtLjk0LDIuNDItLjk0YTE2LjE1LDE2LjE1LDAsMCwxLDUuMTEuOTFMNTYsNS40MWEyNC41NiwyNC41NiwwLDAsMC02LjEzLS43NWMtNS44OSwwLTksMi4yNy05LDUuODksMCwyLjgxLDEuNjYsNC40Nyw2LjUzLDUuMTEsMi4wNiwwLjI3LDIuODEuMzktMi44MSwxLjE1cy0wLjgyLDEtMi4yNCwxYTE2LjY3LDE2LjY3LDAsMCwxLTYtMS4zTDQwLjc3LDIxLjNhMjIuMTQsMjIuMTQsMCwwLDAsNi42OCwxYzYuMzUsMCw5LjI4LTIuMjQsOS4yOC01Ljg5QzU2LjcyLDEzLjU0LDU1LjE1LDEyLDUwLjI2LDExLjIxWk00MC4xOSwxMy4zNWMwLDYuMzQtNS4xNyw5LTEwLDlzLTkuODItMi42LTkuODItOC43M2MwLTYuMjgsNS4wOC05LDEwLTlTNDAuMTksNy4yNSw0MC4xOSwxMy4zNVptLTYuNTYuMThhMy40LDMuNCwwLDEsMC02LjgsMGEzLjI4LDMuMjgsMCwwLDAsMy40MSwzLjQxQTMuMjQsMy4yNCwwLDAsMCwzMy42MywxMy41NFoiIGZpbGw9IiMwMEEwRDYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMCkiPjwvcGF0aD48L3N2Zz4=",
    alt: "PostNord",
    website: "https://postnord.com"
  },
  {
    name: "SJ",
    logo: "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0iZmFsc2UiIGZpbGw9Im5vbmUiIGZvY3VzYWJsZT0iZmFsc2UiIHZpZXdCb3g9IjAgMCA5NiA2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IlNKIGxvZ290eXAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHdpZHRoPSI3LjVyZW0iIGhlaWdodD0iNXJlbSI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjMuMDgzIDIyLjIzMmMtMS4wMTkgNi45MTQtNy4yOTIgNy4yMjEtMTEuNDkgNi45OTQtLjI5Ni0uMDE1LS42MDctLjA2Ny0uODU3LS4wOTYtLjM5My0uMDQ2LS40MjQtLjQ4Mi0uMDg0LS42MjYuODUyLS4zNjMgNS4wNTctMi41ODIgNS41MTUtNy4yNzkuMDk0LS45NjguMDktMi4zMTguMDktMi41OFYuNTAxaDYuOTQxdjE4LjM5YzAgMi4xNDUtLjA2IDIuOTQ3LS4xMTUgMy4zNHpNNTUuNCA0MS41NjVjLjI4Ny03LjA5IDYuMjQ5LTExLjk3MyAxNS40NzMtMTEuOTczaDI0Ljc5MWMuMzQyIDAgLjQyOC4yMTEuMjM0LjU2Ni0uOTAyIDEuNjc0LTMuODA4IDYuNDk2LTcuNDA3IDYuNDk2aC0xNC40M2MtNy45NzIgMC0xMy4zMTIgNC4yMzUtMTQuODM5IDguNTg4LS4yNzcuNzk1LTEuMDYyIDIuNjg1LTIuMTk3IDIuNjg1LTEuNTUxIDAtMS44LTIuMDQ0LTEuNjI1LTYuMzYyem0tMTQuNzk4IDBjLjE3MyA0LjMxOC0uMDcyIDYuMzYyLTEuNjI3IDYuMzYyLTEuMTM1IDAtMS45MTctMS44OS0yLjE5NS0yLjY4NS0xLjUzLTQuMzUzLTYuODY4LTguNTg4LTE0LjgzOC04LjU4OEg3LjUwOWMtMy41OTcgMC02LjUwNy00LjgyMi03LjQwOS02LjQ5Ni0uMTkxLS4zNTUtLjEwNi0uNTY2LjIzNi0uNTY2aDI0Ljc5MmM5LjIyMyAwIDE1LjE4NyA0Ljg4MyAxNS40NzQgMTEuOTczek00OCA1Ni4yNWM1LjE5MSAwIDEwLjQwMy0yLjY3MSAxMi41ODQtNS41ODQgMi43MDMtMy42MTMgMy4xOTItMTAuMTc1IDE1LjI5NC0xMC4xNzVoMTAuNjg1Yy4zNDIgMCAuNDMuMjE2LjIzNi41NjgtLjkwMiAxLjY3NS00LjIyNSA3LjAxOS03LjgyNSA3LjAxOWgtNC45NzJjLTIuNjg1IDAtMy4zMTEgMS43OTEtNC42MDIgMy44OTlDNjUuNiA1OS4xMzcgNTguMSA2NCA0OCA2NGMtMTAuMDk5IDAtMTcuNi00Ljg2NC0yMS40LTEyLjAyMy0xLjI5LTIuMTA4LTEuOTE4LTMuOS00LjYwMi0zLjloLTQuOTczYy0zLjU5OSAwLTYuOTIzLTUuMzQzLTcuODI1LTcuMDE4LS4xOS0uMzUyLS4xMDYtLjU2OC4yMzUtLjU2OGgxMC42ODdjMTIuMTAyIDAgMTIuNTkgNi41NjIgMTUuMjk0IDEwLjE3NUM0OS41OTYgNTMuNTc5IDQ2LjgxIDU2LjI1IDUyIDU2LjI1em0yLjQ3NC01NC44NTd2NC40MjVzLTMuNTk3LTEuNy02LjMxNS0xLjdjLTIuNzEgMC00Ljc2Ljk0LTQuNzYgMi44ODUgMCAyLjQxNiA0LjYxNSAzLjU1NCA2LjMxMSA0LjEyOSAxLjY5Ni41NzQgNi43MTMgMi43MjYgNi43MTMgNy4xMDMgMCA0LjY0My0yLjYxOCA4LjkwMi0xMS42OTYgOC45MDItNC43OCAwLTcuNTEyLTEuNDQ0LTcuNTEyLTEuNDQ0di00LjM3N2MxLjU4LjU3OCA1LjEyOSAxLjQ0NSA2Ljk1NyAxLjQ0NSAzLjExIDAgNC45ODYtLjY1NSA0Ljk4Ni0yLjYxMyAwLTIuNDg0LTQuODc1LTMuOC02Ljc1Ni00LjU1NC0xLjg4My0uNzU2LTYuMjA1LTIuNTQxLTYuMjA1LTcuNjJDMzIuMTk4IDIuMzE2IDM3LjQwNiAwIDQzLjYwNiAwYzQuMjEyIDAgNi44NyAxLjM5MyA2Ljg3IDEuMzkzeiIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48L3BhdGg+PC9zdmc+",
    alt: "SJ",
    website: "https://sj.se"
  },
  {
    name: "Skandia",
    logo: "data:image/svg+xml,%3Csvg viewBox='0 0 794 142' width='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23008f72' d='M273 109H261c-8 0-14-5-14-11 0-8 7-11 14-11h12V109ZM498 107h-4c-19 0-27-9-27-25 0-17 9-25 27-25h4V107ZM94 101c0-39-57-29-57-42 0-5 3-5 20-5 10 0 20 1 31 2V33c-12-2-24-2-36-2C20 31 0 39 0 60c0 38 57 28 57 41 0 4-3 6-20 6 -13 0-26-1-38-2v26c11 2 29 2 43 2C70 132 94 124 94 101M213 130l-40-52 35-45h-38l-23 31c-1 2-4 2-8 2V0h-34v130h34V89c3 0 7 0 8 2l28 38H213ZM314 130c-4-5-6-9-6-15V65c0-31-27-34-51-34 -12 0-23 1-35 2v23c9-1 19-2 29-2 15 0 22 3 22 9v4h-11c-27 0-50 8-50 31 0 24 14 35 33 35 14 0 22-2 29-10 1 3 2 5 4 8H314ZM421 130V66c0-16-6-35-34-35 -12 0-22 5-27 10 -1-3-3-5-5-8h-35c4 5 6 9 6 15v82h34V56h12c12 0 15 6 15 16v58H421ZM538 130c-4-5-6-9-6-15V0h-34v33h-9c-38 0-56 21-56 48 0 31 15 51 39 51 13 0 21-3 26-10 1 3 3 5 5 8H538ZM587 33h-34v97h34V33ZM587 0h-34v22h34V0ZM701 130c-4-5-6-9-6-15V65c0-31-27-34-51-34 -12 0-23 1-35 2v23c9-1 19-2 29-2 15 0 22 3 22 9v4h-11c-27 0-50 8-50 31 0 24 14 35 33 35 14 0 22-2 29-10 1 3 2 5 4 8H701ZM660 109h-12c-8 0-14-5-14-11 0-8 7-11 14-11h12V109Z'%3E%3C/path%3E%3Cpath fill='%23008f72' d='M764 142c-17 0-30-12-30-27 0-15 13-27 30-27 17 0 30 12 30 27C794 130 780 142 764 142M764 73c-17 0-30-12-30-27 0-15 13-27 30-27 17 0 30 12 30 27C794 61 780 73 764 73'%3E%3C/path%3E%3C/svg%3E",
    alt: "Skandia",
    website: "https://skandia.se"
  },
  {
    name: "KTH",
    logo: "https://www.kth.se/img/logotype-blue-ff671d438dd60cb940a663d2fd5e0cf9.svg",
    alt: "KTH Royal Institute of Technology",
    website: "https://kth.se"
  },
  {
    name: "Sveriges Riksbank",
    logo: "https://www.riksbank.se/Content/images/logo-riksbanken.svg",
    alt: "Sveriges Riksbank",
    website: "https://riksbank.se"
  },
  {
    name: "Axfood",
    logo: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='100' height='24' viewBox='0 0 100 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M48.9563953,7.35581395 L45.0581395,7.35581395 L45.0581395,6.42267442 C45.0581395,4.25697674 46.1575581,3.75755814 47.6238372,3.75755814 L49.8226744,3.75755814 L49.8226744,0.0255813953 L47.1238372,0.0255813953 C42.8261628,0.0255813953 40.7267442,2.69186047 40.7267442,6.38953488 L40.7267442,7.35581395 L33.097093,7.35581395 L30.3982558,11.2098837 L27.6994186,7.35523256 L22.5686047,7.35523256 L33.7674419,23.3488372 L38.8982558,23.3488372 L32.7645349,14.5889535 L37.8284884,7.35639535 L37.8284884,11.0877907 L40.7273256,11.0877907 L40.7273256,23.3494186 L45.0587209,23.3494186 L45.0587209,11.0872093 L48.9569767,11.0872093 L48.9569767,7.35581395 M8.22965116,13.8860465 L11.3284884,5.49011628 L14.3598837,13.8860465 L8.22965116,13.8860465 Z M22.3662791,22.680814 L13.7936047,0.35872093 L8.82906977,0.35872093 L0,23.3488372 L4.73139535,23.3488372 L6.69651163,18.0511628 L15.8593023,18.0511628 L17.7581395,23.3488372 L26.6302326,23.3488372 L30.1988372,18.252907 L25.4674419,18.252907 L22.3662791,22.6802326 L22.3662791,22.680814 Z M56.9127907,19.6831395 C54.2802326,19.6831395 52.7476744,17.6174419 52.7476744,15.3186047 C52.7476744,13.0197674 54.2802326,11.0209302 56.9122093,11.0209302 C59.544186,11.0209302 61.0773256,13.0197674 61.0773256,15.3186047 C61.0773256,17.6174419 59.544186,19.6831395 56.9122093,19.6831395 L56.9127907,19.6831395 Z M56.9127907,7.02267442 C52.1476744,7.02267442 48.5831395,10.7540698 48.5831395,15.3523256 C48.5831395,19.95 52.1476744,23.6813953 56.9122093,23.6813953 C61.6767442,23.6813953 65.2418605,19.95 65.2418605,15.3523256 C65.2418605,10.7540698 61.6767442,7.02267442 56.9122093,7.02267442 L56.9127907,7.02267442 Z M74.3639535,19.6831395 C71.7319767,19.6831395 70.1988372,17.6174419 70.1988372,15.3186047 C70.1988372,13.0197674 71.7319767,11.0209302 74.3639535,11.0209302 C76.9959302,11.0209302 78.5284884,13.0197674 78.5284884,15.3186047 C78.5284884,17.6174419 76.9959302,19.6831395 74.3639535,19.6831395 L74.3639535,19.6831395 Z M74.3639535,7.02267442 C69.5994186,7.02267442 66.0343023,10.7540698 66.0343023,15.3523256 C66.0343023,19.95 69.5994186,23.6813953 74.3639535,23.6813953 C79.1284884,23.6813953 82.6930233,19.95 82.6930233,15.3523256 C82.6930233,10.7540698 79.1284884,7.02267442 74.3639535,7.02267442 Z M91.8151163,19.9831395 C89.3831395,19.9831395 87.6837209,18.2837209 87.6837209,15.1854651 C87.6837209,12.2534884 89.4831395,10.5877907 91.8151163,10.5877907 C94.0145349,10.5877907 95.8133721,12.1203488 95.8133721,15.1186047 C95.8133721,18.2837209 94.0145349,19.9831395 91.8151163,19.9831395 L91.8151163,19.9831395 Z M95.5802326,0.0255813953 L95.5802326,9.02151163 C95.1139535,8.08895349 93.8145349,7.02267442 91.0825581,7.02267442 C86.5843023,7.02267442 83.4860465,10.5540698 83.4860465,15.2517442 C83.4860465,20.15 86.6843023,23.6819767 91.1825581,23.6819767 C93.2813953,23.6819767 94.8802326,22.7488372 95.5802326,21.5825581 L95.747093,23.3482558 L99.9116279,23.3482558 L99.9116279,0.0255813953 L95.5802326,0.0255813953 L95.5802326,0.0255813953 Z' fill='%23000' fill-rule='nonzero'/%3E%3C/svg%3E",
    alt: "Axfood",
    website: "https://axfood.se"
  },
  {
    name: "NOVA Consulting",
    logo: "https://www.novaconsultinggroup.se/view-resources/dachser2/public/novaconsultinggroup/nova_2.svg",
    alt: "NOVA Consulting Group",
    website: "https://www.novaconsultinggroup.se"
  },
  {
    name: "Adlibris",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMwIiBoZWlnaHQ9IjMzIiB2aWV3Qm94PSIwIDAgMTM2IDMzIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJ0ZXh0LWZpbGwtYnJhbmQiPjxtYXNrIGlkPSJhIiBzdHlsZT0ibWFzay10eXBlOmx1bWluYW5jZSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMSIgd2lkdGg9IjEzNiIgaGVpZ2h0PSIzMCI+PHBhdGggZD0iTTAgMS41MjdoMTM2djI4LjQ3NUgwVjEuNTI3WiIgZmlsbD0iI2ZmZiI+PC9wYXRoPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2EpIj48cGF0aCBkPSJNNjguMTE0IDIxLjQ5NWMwIDIuNzAyLS45OTEgNC4wODUtMi45MDggNC4wODUtLjkyNSAwLTEuNTItLjI2My0yLjI0Ny0uOTg4VjEzLjUyNGMuNjYtLjYyNiAxLjM4OC0uOTIyIDIuMzEzLS45MjIgMS44NSAwIDIuODQyIDEuMzUgMi44NDIgMy45MnY0Ljk3NFptLS42MjgtMTIuOTc4Yy0yLjExNSAwLTMuNjY4IDEuMDU1LTQuNDYxIDIuOTMyVjMuNzc0aC01LjU1MnYyNS4zNjRoMi40NDZsMi4xNDgtMy4zOTNjLjU2MiAyLjU3IDIuMjggMy45MiA0Ljk1NyAzLjkyIDQuMjYyIDAgNi41NzYtMy43MjMgNi41NzYtMTAuNjA3IDAtNy4wMTYtMi4wNS0xMC41NC02LjExNC0xMC41NFpNNTQuODMgNC42NjNjMCAxLjg0NS0xLjE5IDIuODY2LTMuMzA1IDIuODY2LTIuMTQ4IDAtMy4zMzgtMS4wMi0zLjMzOC0yLjg2NiAwLTEuNzc4IDEuMjIzLTIuOCAzLjMzOC0yLjhzMy4zMDUgMS4wMjIgMy4zMDUgMi44Wk04NS4xOTkgOC41NWMuNDMgMCAuODkyLjAzMyAxLjI1NS4xMzJ2NS42OTljLS40OTUtLjE5OC0xLjE5LS4zMy0xLjg4My0uMzMtMS40MjEgMC0yLjY0NC41Ni0zLjIwNiAxLjQxN3YxMy42N0g3NS44OFY4Ljk0NmgyLjYxbDIuNjQ0IDQuMDUxdi0uMDY2YzAtMi44NjUgMS40MjEtNC4zOCA0LjA2NS00LjM4Wm05LjI4NS0zLjg4N2MwIDEuODQ1LTEuMTU2IDIuODY2LTMuMjcxIDIuODY2LTIuMTQ4IDAtMy4zMzgtMS4wMi0zLjMzOC0yLjg2NiAwLTEuNzc4IDEuMjIzLTIuOCAzLjMzOC0yLjggMi4wODIgMCAzLjI3MiAxLjAyMiAzLjI3MiAyLjhabS02LjA0NyA0LjI4M2g1LjQ4NnYyMC4xOTFoLTUuNDg2VjguOTQ2Wk0zMS4yNjggMjQuNTkyYy0uNzI3LjcyNS0xLjMyMi45ODgtMi4yNDcuOTg4LTEuOTE3IDAtMi45MDgtMS4zODMtMi45MDgtNC4wODR2LTQuOTc0YzAtMi41Ny45OTEtMy45MiAyLjg0Mi0zLjkyLjkyNSAwIDEuNjUyLjI5NiAyLjMxMy45MjJ2MTEuMDY4Wm0tLjA2Ni0xMy4xNDNjLS43OTMtMS44NzctMi4zNDYtMi45MzItNC40NjEtMi45MzItNC4wNjUgMC02LjExNCAzLjUyNS02LjExNCAxMC41NDEgMCA2Ljg4NCAyLjMxNCAxMC42MDcgNi41NzYgMTAuNjA3IDIuNjc3IDAgNC4zOTUtMS4zNSA0Ljk1Ny0zLjkybDIuMTQ4IDMuMzkzaDIuNDQ2VjMuNzc0aC01LjU1MnY3LjY3NVptNzkuNzM5IDExLjgyNWMwIDMuODg3LTIuODA5IDYuMzU4LTcuMjM3IDYuMzU4LTQuNDYgMC03LjQ2OC0yLjA3Ni03Ljg2NS01LjQzNWw0Ljk5LS44OWMuMjMyIDEuNDE3IDEuMjg5IDIuMjczIDIuNzQzIDIuMjczIDEuMzU1IDAgMi4yNDctLjgyMyAyLjI0Ny0yLjA3NSAwLTEuNDE2LTEuMDktMi4zMDYtMy4zMzctMi43MzQtNC40MjgtLjc1OC02LjM0NS0yLjU3LTYuMzQ1LTUuOTk1IDAtMy42OSAzLjAwNy02LjI1OSA3LjM2OS02LjI1OSA0LjE5NyAwIDcuMDM5IDIuMTQyIDcuMzAzIDUuNTAxbC00Ljk5Ljg5Yy0uMDMzLTEuMzg0LS45NTgtMi4zMzktMi4yOC0yLjMzOS0xLjM4OCAwLTIuMjE0LjY5Mi0yLjIxNCAxLjg3NyAwIDEuMTUzLjg1OSAxLjc0NiAzLjUwMyAyLjQwNSA0LjM2MiAxLjA1NCA2LjExMyAyLjg5OSA2LjExMyA2LjQyM1ptLTcwLjkxNi0xOS41aDUuNTE5djI1LjM2NGgtNS41MTlWMy43NzRaTTcuNzQgMjAuMzc2bDEuNjItNi41ODguNTk1LTMuMjk0LjU5NCAzLjI5NCAxLjQ1NCA2LjU4OEg3Ljc0Wk02LjgxNCA2LjA4TC4yMDUgMjkuMTM4aDUuMjg3bDEuMTktNC40OGg2LjM0NWwxLjA5IDQuNDhoNi4wMTVMMTMuOTg1IDYuMDhoLTcuMTdaTTQ4Ljc1IDguOTQ2aDUuNDg2djIwLjE5MWgtNS40ODZWOC45NDZabTgzLjY3OSA5LjI4NGE4LjQwNCA4LjQwNCAwIDAgMC01Ljg5MSAyLjM5OCA4LjQwNCA4LjQwNCAwIDAgMC01Ljg5MS0yLjM5OFY1LjY1YzIuMjkzIDAgNC4zNzMuOTE0IDUuODkxIDIuMzk4YTguNDAzIDguNDAzIDAgMCAxIDUuODkxLTIuMzk4VjE4LjIzWk0xMTcuMjc5IDIuMjkydjE4LjQ1Nmw4LjQxNiA4LjM5aDEuNjg0bDguNDE2LTguMzlWMi4yOTJoLTE4LjUxNloiIGZpbGw9IiNENjBEMEQiPjwvcGF0aD48L2c+PC9zdmc+",
    alt: "Adlibris",
    website: "https://adlibris.com"
  },
  {
    name: "Cisco",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/2560px-Cisco_logo_blue_2016.svg.png",
    alt: "Cisco",
    website: "https://cisco.com"
  },
  {
    name: "Walmart",
    logo: "https://i5.walmartimages.com/dfw/63fd9f59-14e2/9d304ce6-96de-4331-b8ec-c5191226d378/v1/spark-icon.svg",
    alt: "Walmart",
    website: "https://walmart.com"
  },
  {
    name: "Mars",
    logo: "https://www.mars.com/themes/custom/mars_acss/assets/images/logo-main.svg",
    alt: "Mars",
    website: "https://mars.com"
  },
  {
    name: "Valtech",
    logo: "data:image/svg+xml,%3Csvg aria-labelledby='logo-title' width='159' height='36' viewBox='0 0 159 36' fill='none' xmlns='http://www.w3.org/2000/svg' role='img'%3E%3Ctitle id='logo-title'%3EValtech, go back to homepage%3C/title%3E%3Cdesc%3EThe Experience Innovation Company%3C/desc%3E%3Cg clip-path='url(%23clip0_338_12517)'%3E%3Cpath d='M158.456 16.8545H142.983L153.926 6.08073L152.28 4.46073L141.338 15.2345V0H139.011V15.2345L128.068 4.46073L126.423 6.08073L137.365 16.8545H121.892V19.1455H137.365L126.423 29.9193L128.068 31.5393L139.011 20.7655V36H141.338V20.7655L152.28 31.5393L153.926 29.9193L142.983 19.1455H158.456V16.8545ZM140.174 19.1455C139.533 19.1455 139.011 18.6316 139.011 18C139.011 17.3684 139.533 16.8545 140.174 16.8545C140.816 16.8545 141.338 17.3684 141.338 18C141.338 18.6316 140.816 19.1455 140.174 19.1455Z' fill='currentColor'%3E%3C/path%3E%3Cpath d='M19.7448 8.17871L11.1355 31.0878H8.64248L0 8.17871H2.55951L9.90562 28.3714L17.2185 8.17871H19.7448Z' fill='currentColor'%3E%3C/path%3E%3Cpath d='M27.1738 12.6987C22.5866 12.6987 19.8941 15.0551 19.6282 18.9169H21.955C22.2542 16.1678 24.2819 14.6951 27.1738 14.6951C29.833 14.6951 31.628 15.9387 31.628 18.0333C31.628 19.4733 30.664 20.3242 27.8053 20.3242H25.7444C21.3235 20.3242 18.9302 22.386 18.9302 25.8224C18.9302 29.5205 21.6226 31.4842 25.1794 31.4842C28.304 31.4842 30.9299 29.9133 31.8607 27.0333V31.0915H34.0545V31.0031V18.6224C34.0545 15.1533 31.8607 12.6987 27.1738 12.6987ZM31.7277 22.7133C31.7277 27.426 28.7028 29.5205 25.5782 29.5205C22.6199 29.5205 21.3567 27.6878 21.3567 25.8224C21.3567 24.0878 22.4869 22.2878 25.8109 22.2878H27.4065C29.8995 22.2878 31.2956 21.5351 31.6945 20.1933H31.7277V22.7133Z' fill='currentColor'%3E%3C/path%3E%3Cpath d='M38.293 4.90601H40.6198V31.0911H38.293V4.90601Z' fill='currentColor'%3E%3C/path%3E%3Cpath d='M49.0628 15.0514V25.9823C49.0628 27.9787 49.8939 29.1242 51.5891 29.1242H53.3841V31.0878H51.2567C48.2651 31.0878 46.736 29.386 46.736 26.2769V15.0514H43.0796V13.0878H46.736V8.17871H49.0628V13.0878H53.3841V15.0514H49.0628Z' fill='currentColor'%3E%3C/path%3E%3Cpath d='M72.5969 22.7746H57.8382C58.0709 26.9637 60.6304 29.4837 64.1539 29.4837C66.9461 29.4837 69.14 27.9128 69.971 25.5564H72.4307C71.6662 28.9928 68.4419 31.48 64.1539 31.48C58.9019 31.48 55.3452 27.7491 55.3452 22.0873C55.3452 16.4255 58.9684 12.6946 64.1539 12.6946C69.007 12.6946 72.5969 16.2619 72.5969 20.9746V22.7746ZM57.8382 20.7455H70.2369C69.971 17.2109 67.6441 14.6909 64.1539 14.6909C60.6637 14.6909 58.0709 17.3746 57.8382 20.7455Z' fill='currentColor'%3E%3C/path%3E%3Cpath d='M74.9238 22.0546C74.9238 16.5237 78.2811 12.6946 83.8987 12.6946C89.0177 12.6946 91.8432 15.9673 92.242 19.96H89.7823C89.5496 17.1455 87.4887 14.6909 83.8987 14.6909C79.8434 14.6909 77.3836 17.7346 77.3836 22.0546C77.3836 26.6037 80.209 29.4837 83.8987 29.4837C87.5884 29.4837 89.4499 26.8 89.7823 24.5746H92.242C91.7434 28.2073 88.8515 31.48 83.8987 31.48C78.547 31.48 74.9238 27.7491 74.9238 22.0546Z' fill='currentColor'%3E%3C/path%3E%3Cpath d='M95.4995 4.90601H97.8263V14.1351C97.8263 14.9533 97.8263 15.5751 97.7599 16.786H97.8263C98.7571 14.7896 100.685 12.6951 103.976 12.6951C107.898 12.6951 110.291 15.4442 110.291 19.7315V31.0878H107.965V20.026C107.965 16.4587 106.136 14.7242 103.477 14.7242C100.519 14.7242 97.8263 16.8842 97.8263 20.9424V31.0878H95.4995V4.90601Z' fill='currentColor'%3E%3C/path%3E%3C/g%3E%3C/svg%3EImxvZ28tdGl0bGUiIHdpZHRoPSIxNTkiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAxNTkgMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcm9sZT0iaW1nIj4KICAgICAgICAgICAgICAgICAgICA8dGl0bGUgaWQ9ImxvZ28tdGl0bGUiPlZhbHRlY2gsIGdvIGJhY2sgdG8gaG9tZXBhZ2U8L3RpdGxlPgogICAgICAgICAgICAgICAgPGRlc2M+VGhlIEV4cGVyaWVuY2UgSW5ub3ZhdGlvbiBDb21wYW55PC9kZXNjPgogICAgICAgICAgICAgICAgPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzMzOF8xMjUxNykiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNTguNDU2IDE2Ljg1NDRIMTQ1LjkzNUwxNTMuOTI2IDYuMDgwNzNMMTUyLjI4IDQuNDYwNzNMMTQxLjMzOCAxNS4yMzQ1VjBIMTM5LjAxMVYxNS4yMzQ1TDEyOC4wNjggNC40NjA3M0wxMjYuNDIzIDYuMDgwNzNMMTM3LjM2NSAxNi44NTQ0SDEyMS44OTJWMTKUOTA5MDVIMTMzLjM2NUwxMjYuNDIzIDI5LjkxOTNMMTI4LjA2OCAzMS41MzkzTDEzOS4wMTEgMjAuNzY1NVYzNkgxNDEuMzM4VjIwLjc2NTVMMTUyLjI4IDMxLjUzOTNMMTUzLjkyNiAyOS45MTkzTDE0Mi45ODMgMTkuMTQ1NEgxNTguNDU2VjE2Ljg1NDRaTTE0MC4xNzQgMTkuMTQ1NUMxMzkuNTMzIDE5LjE0NTQgMTM5LjAxMSAxOC42MzE2IDEzOS4wMTEgMThDMTM5LjAxMSAxNy4zNjg0IDEzOS41MzMgMTYuODU0NCAxNDAuMTc0IDE2Ljg1NDRDMTQwLjgxNiAxNi44NTQ0IDE0MS4zMzggMTcuMzY4NCAxNDEuMzM4IDE4QzE0MS4zMzggMTguNjMxNiAxNDAuODE2IDE5LjE0NTQgMTQwLjE3NCAxOS4xNDU0WiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE5Ljc0NDggOC4xNzg3MUwxMS4xMzU1IDMxLjA4NzhIOC42NDI0OEwwIDguMTc4NzFIMi41NTk1MUw5LjkwNTYyIDI4LjM3MTRMMTcuMjE4NSA4LjE3ODcxSDE5Ljc0NDhaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjcuMTczOCAxMi42OTg3QzIyLjU4NjYgMTIuNjk4NyAxOS44OTQxIDE1LjA1NTEgMTkuNjI4MiAxOC45MTY5SDIxLjk1NUMyMi4yNTQyIDE2LjE2NzggMjQuMjgxOSAxNC42OTUxIDI3LjE3MzggMTQuNjk1MUMyOS44MzMgMTQuNjk1MSAzMS42MjggMTUuOTM4NyAzMS42MjggMTguMDMzM0MzMS42MjggMTkuNDczMyAzMC42NjQgMjAuMzI0MiAyNy44MDUzIDIwLjMyNDJIMjUuNzQ0NEMyMS4zMjM1IDIwLjMyNDIgMTguOTMwMiAyMi4zODYgMTguOTMwMiAyNS44MjI0QzE4LjkzMDIgMjkuNTIwNSAyMS42MjI2IDMxLjQ4NDIgMjUuMTc5NCAzMS40ODQyQzI4LjMwNCAzMS40ODQyIDMwLjkyOTkgMjkuOTEzMyAzMS44NjA3IDI3LjAzMzNWMzEuMDkxNUgzNC4wNTQ1VjMxLjAwMzFWMTguNjIyNEMzNC4wNTQ1IDE1LjE1MzMgMzEuODYwNyAxMi42OTg3IDI3LjE3MzggMTIuNjk4N1pNMzEuNzI3NyAyMi43MTMzQzMxLjcyNzcgMjcuNDI2IDI4LjcwMjggMjkuNTIwNSAyNS41NzgyIDI5LjUyMDVDMjIuNjE5OSAyOS41MjA1IDIxLjM1NjcgMjcuNjg3OCAyMS4zNTY3IDI1LjgyMjRDMjEuMzU2NyAyNC4wODc4IDIyLjQ4NjkgMjIuMjg3OCAyNS44MTA5IDIyLjI4NzhIMjcuNDA2NUMyOS44OTk1IDIyLjI4NzggMzEuMjk1NiAyMS41MzUxIDMxLjY5NDUgMjAuMTkzM0gzMS43Mjc3VjIyLjcxMzNaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMzguMjkzIDQuOTA2MDFINDMC2MTk4VjMxLjA5MTFIMzguMjkzVjQuOTA2MDFaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNDkuMDYyOCAxNS4wNTE0VjI1Ljk4MjNDNDkuMDYyOCAyNy45Nzg3IDQ5Ljg5MzkgMjkuMTI0MiA1MS41ODkxIDI5LjEyNDJINTMuMzg0MVYzMS4wODc4SDUxLjI1NjdDNDguMjY1MSAzMS4wODc4IDQ2LjczNiAyOS4zODYgNDYuNzM2IDI2LjI3NjlWMTUuMDUxNEg0My4wNzk2VjEzLjA4NzhINDYuNzM2VjguMTc4NzFINDkuMDYyOFYxMy4wODc4SDUzLjM4NDFWMTVUMDU1MUg0OS4wNjI4WiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTcyLjU5NjkgMjIuNzc0Nkg1Ny44MzgyQzU4LjA3MDkgMjYuOTYzNyA2MC42MzA0IDI5LjQ4MzcgNjQuMTUzOSAyOS40ODM3QzY2Ljk0NjEgMjkuNDgzNyA2OS4xNCAyNy45MTI4IDY5Ljk3MSAyNS41NTY0SDcyLjQzMDdDNzEuNjY2MiAyOC45OTI4IDY4LjQ0MTkgMzEuNDggNjQuMTUzOSAzMS40OEM1OC45MDE5IDMxLjQ4IDU1LjM0NTIgMjcuNzQ5MSA1NS4zNDUyIDIyLjA4NzNDNTUuMzQ1MiAxNi40MjU1IDU4Ljk2ODQgMTIuNjk0NiA2NC4xNTM5IDEyLjY5NDZDNjkuMDA3IDEyLjY5NDYgNzIuNTk2OSAxNi4yNjE5IDcyLjU5NjkgMjAuOTc0NlYyMi43NzQ2Wk01Ny44MzgyIDIwLjc0NTVINDMC2NjYyMzY5QzY5Ljk3MSAxNy4yMTA5IDY3LjY0NDEgMTQuNjkwOSA2NC4xNTM5IDE0LjY5MDlDNjAuNjYzNyAxNC42OTA5IDU4LjA3MDkgMTcuMzc0NiA1Ny44MzgyIDIwLjc0NTVaIiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNzQuOTIzOCAyMi4wNTQ2Qzc0LjkyMzggMTYuNTIzNyA3OC4yODExIDEyLjY5NDYgODMuODk4NyAxMi42OTQ2Qzg5LjAxNzcgMTIuNjk0NiA5MS44NDMyIDE1Ljk2NzMgOTIuMjQyIDE5Ljk2SDg5Ljc4MjNDODkuNTQ5NiAxNy4xNDU1IDg3LjQ4ODcgMTQuNjkwOSA4My44OTg3IDE0LjY5MDlDNzkuODQzNCAxNC42OTA5IDc3LjM4MzYgMTcuNzM0NiA3Ny4zODM2IDIyLjA1NDZDNzcuMzgzNiAyNi42MDM3IDgwLjIwOSAyOS40ODM3IDgzLjg5ODcgMjkuNDgzN0M4Ny41ODg0IDI5LjQ4MzcgODkuNDQ5OSAyNi44IDg5Ljc4MjMgMjQuNTc0Nkg5Mi4yNDJDOTEuNzQzNCAyOC4yMDczIDg4Ljg1MTUgMzEuNDggODMuODk4NyAzMS40OEM3OC41NDcgMzEuNDggNzQuOTIzOCAyNy43NDkxIDc0LjkyMzggMjIuMDU0NloiIGZpbGw9ImN1cnJlbnRDb2xvciI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05NS40OTk1IDQuOTA2MDFIOTYUNNEZTY2MyAxNC4xMzUxQzk3LjgyNjMgMTQuOTUzMyA5Ny44MjYzIDE1LjU3NTEgOTcuNzU5OSAxNi43ODZIOTcuODI2M0M5OC43NTcxIDE0Ljc4OTYgMTAwLjY4NSAxMi42OTUxIDEwMy45NzYgMTIuNjk1MUMxMDcuODk4IDEyLjY5NTEgMTEwLjI5MSAxNS40NDQyIDExMC4yOTEgMTkuNzMxNVYzMS4wODc4SDEwNy45NjVWMjAuMDI2QzEwNy45NjUgMTYuNDU4NyAxMDYuMTM2IDE0LjcyNDIgMTAzLjQ3NyAxNC43MjQyQzEwMC41MTkgMTQuNzI0MiA5Ny44MjYzIDE2Ljg4NDIgOTcuODI2MyAyMC45NDI0VjMxLjA4NzhIOTUuNDk5NVY0LjkwNjAxWiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvc3ZnPg==",
    alt: "Valtech",
    website: "https://valtech.com"
  },
  {
    name: "Uppsala Universitet",
    logo: "https://www.uu.se/images/18.17dda5f1791cdbd287d9b55/1622452923523/uu-logo-red.svg",
    alt: "Uppsala Universitet",
    website: "https://uu.se"
  },
  {
    name: "Dorian Collective",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHBosOYvu3f7A/company-logo_200_200/B4DZjhwCgOHsAM-/0/1756134123926?e=2147483647&v=beta&t=q1JW3oBKvmsqFf6iC21a5ruJUXKmvaNM_kn9okUng4Q",
    alt: "Dorian Collective",
    website: "https://doriancollective.com"
  },
  {
    name: "AstraZeneca",
    logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjAwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTAgMzBMMzAgMTBIMTBWMzBaIiBmaWxsPSIjMDA1N0EwIi8+CjxwYXRoIGQ9Ik0zMCAzMEw1MCA1MEgzMFYzMFoiIGZpbGw9IiMwMDU3QTAiLz4KPHA+YXRoIGQ9Ik01MCAzMEw3MCA1MEg1MFYzMFoiIGZpbGw9IiMwMDU3QTAiLz4KPHA+YXRoIGQ9Ik03MCAzMEw5MCA1MEg3MFYzMFoiIGZpbGw9IiMwMDU3QTAiLz4KPHA+YXRoIGQ9Ik05MCAzMEwxMTAgMTBIOTBWMzBaIiBmaWxsPSIjMDA1N0EwIi8+Cjx0ZXh0IHg9IjEyMCIgeT0iMzUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzAwNTdBMCI+QXN0cmFaZW5lY2E8L3RleHQ+Cjwvc3ZnPg==",
    alt: "AstraZeneca",
    website: "https://astrazeneca.com"
  },
  {
    name: "Procter & Gamble",
    logo: "https://images.ctfassets.net/oggad6svuzkv/7znyJc3Y7SecEoKSYKWoaQ/4a24e9015c360799cfb072adcd92cc5e/P_G_Logo_RGB.svg",
    alt: "Procter & Gamble",
    website: "https://pg.com"
  },
  {
    name: "Securitas",
    logo: "https://www.securitasdirect.se/sites/sd-se/files/flmngr/Examples/securitas-direct-white.png",
    alt: "Securitas",
    website: "https://securitas.com"
  }
];

// Mac Window Component with Typing Animation
const MacWindow = () => {
  const [windowState, setWindowState] = useState<'minimized' | 'normal' | 'maximized'>('normal');
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [showConsoleOutput, setShowConsoleOutput] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const windowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionPreference();

  // Code lines to type out
  const codeLines = useMemo(() => [
    "const fetchAvailableConsultants = async () => {",
    "  const response = await fetch('/api/consultants', {",
    "    method: 'GET',",
    "    headers: { 'Content-Type': 'application/json' }",
    "  });",
    "",
    "  if (!response.ok) {",
    "    throw new Error('Failed to fetch consultants');",
    "  }",
    "",
    "  return await response.json();",
    "};",
    "",
    "// Let's see who's available for your project",
    "const consultants = await fetchAvailableConsultants();",
    "console.log(consultants);"
  ], []);

  // Mock JSON response to show after typing
  const jsonResponse = {
    success: true,
    data: {
      "niklas": "senior front-end developer and accessibility expert",
      "robert": "full-stack developer and AI specialist/engineer", 
      "andreas": "full-stack developer and accessibility certified professional",
      "lucas": "DevOps engineer and AI specialist/cloud"
    },
    total: 5,
    available: 4,
    expertise: ["React", "TypeScript", "Node.js", "AI/ML", "Accessibility", "Cloud", "Mobile"],
    responseTime: "147ms"
  };

  // Typing animation logic - simplified approach
  const startTyping = useCallback(() => {
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    
    const intervalId = setInterval(() => {
      const currentLineText = codeLines[currentLineIndex] || '';
      
      if (currentCharIndex >= currentLineText.length) {
        // Move to next line
        currentLineIndex++;
        currentCharIndex = 0;
        
        if (currentLineIndex >= codeLines.length) {
          // All lines complete
          clearInterval(intervalId);
          setCurrentLine(currentLineIndex - 1);
          setCurrentChar(codeLines[currentLineIndex - 1]?.length || 0);
          
          setTimeout(() => {
            setTypingComplete(true);
            setTimeout(() => {
              setShowConsoleOutput(true);
            }, 500);
          }, 500);
          return;
        }
        
        setCurrentLine(currentLineIndex);
        setCurrentChar(0);
      } else {
        // Type next character
        currentCharIndex++;
        setCurrentLine(currentLineIndex);
        setCurrentChar(currentCharIndex);
      }
    }, 30);
  }, [codeLines]);

  // Intersection Observer for scroll-triggered animation
  useEffect(() => {
    const currentRef = windowRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Delay to create the "opening from dock" effect
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
            // Start typing after window animation completes
            setTimeout(() => {
              if (!prefersReducedMotion) {
                startTyping();
              } else {
                // Show all content immediately if reduced motion
                setCurrentLine(codeLines.length - 1);
                setCurrentChar(codeLines[codeLines.length - 1].length);
                setTypingComplete(true);
                setShowConsoleOutput(true);
              }
            }, 700); // Wait for window animation to complete
          }, 200);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, prefersReducedMotion, startTyping, codeLines]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
      setWindowState('normal');
    }, 2000);
  };

  const handleMinimize = () => {
    setWindowState('minimized');
    setTimeout(() => {
      setWindowState('normal');
    }, 2000);
  };

  const handleMaximize = () => {
    if (windowState === 'maximized') {
      setWindowState('normal');
    } else {
      setWindowState('maximized');
    }
  };

  // Render typed content
  const renderTypedContent = () => {
    return codeLines.map((line, lineIndex) => {
      if (lineIndex < currentLine) {
        // Fully typed lines
        return (
          <div key={lineIndex} className="text-gray-300">
            {renderSyntaxHighlighting(line)}
          </div>
        );
      } else if (lineIndex === currentLine) {
        // Currently typing line
        const visibleText = line.substring(0, currentChar);
        return (
          <div key={lineIndex} className="text-gray-300">
            {renderSyntaxHighlighting(visibleText)}
            <span className="animate-pulse bg-emerald-400 w-2 h-4 inline-block ml-0.5"></span>
          </div>
        );
      }
      return null;
    });
  };

  // Simple syntax highlighting with proper JSX elements
  const renderSyntaxHighlighting = (text: string) => {
    // Handle empty lines
    if (!text.trim()) {
      return <span>&nbsp;</span>;
    }

    // Split text into tokens and apply highlighting
    let key = 0;

    // Process the text character by character to maintain proper highlighting
    const processText = (str: string): JSX.Element[] => {
      const result: JSX.Element[] = [];
      let i = 0;
      
      while (i < str.length) {
        // Check for keywords
        if (/\b(const|await|async|return|if|throw|new)\b/.test(str.slice(i))) {
          const match = str.slice(i).match(/\b(const|await|async|return|if|throw|new)\b/);
          if (match && match.index === 0) {
            result.push(<span key={key++} className="text-blue-300">{match[0]}</span>);
            i += match[0].length;
            continue;
          }
        }
        
        // Check for built-in functions
        if (/\b(fetch|Error|response|json|console|log)\b/.test(str.slice(i))) {
          const match = str.slice(i).match(/\b(fetch|Error|response|json|console|log)\b/);
          if (match && match.index === 0) {
            result.push(<span key={key++} className="text-yellow-300">{match[0]}</span>);
            i += match[0].length;
            continue;
          }
        }
        
        // Check for strings
        if (str[i] === "'" || str[i] === '"') {
          const quote = str[i];
          let j = i + 1;
          while (j < str.length && str[j] !== quote) {
            j++;
          }
          if (j < str.length) {
            j++; // Include closing quote
            result.push(<span key={key++} className="text-green-400">{str.slice(i, j)}</span>);
            i = j;
            continue;
          }
        }
        
        // Check for comments
        if (str.slice(i, i + 2) === '//') {
          result.push(<span key={key++} className="text-gray-500">{str.slice(i)}</span>);
          break;
        }
        
        // Regular character
        result.push(<span key={key++} className="text-gray-300">{str[i]}</span>);
        i++;
      }
      
      return result;
    };

    return <span>{processText(text)}</span>;
  };

  return (
    <div ref={windowRef} className="relative min-h-[300px] flex items-center justify-center">
      {/* Initial dock icon before animation */}
      {!isVisible && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`w-16 h-16 bg-gray-800 rounded-xl shadow-lg border border-gray-600 flex items-center justify-center ${
            prefersReducedMotion ? '' : 'animate-pulse'
          }`}>
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
          </div>
          <div className="text-center mt-2 text-xs text-gray-500 dark:text-gray-400">
            Terminal
          </div>
        </div>
      )}

      {/* Mac Window */}
      <div 
        className={`
          bg-gray-900 dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden
          font-mono text-sm transform-gpu transition-all duration-500 ease-in-out
          ${!isVisible 
            ? 'scale-0 opacity-0 translate-y-32' 
            : windowState === 'minimized' 
              ? 'scale-50 opacity-50 translate-y-32' 
              : windowState === 'maximized' 
                ? 'scale-100 opacity-100 translate-y-0 w-[1120px] max-w-6xl relative shadow-3xl' 
                : 'scale-100 opacity-100 translate-y-0 w-[540px] max-w-xl relative'
          }
          ${!prefersReducedMotion && isVisible ? 'animate-in slide-in-from-bottom-8 fade-in duration-700' : ''}
        `}
      >
        {/* Window Title Bar */}
        <div className="bg-gray-800 dark:bg-gray-700 px-4 py-3 flex items-center justify-between border-b border-gray-600">
          <div className="flex items-center gap-2">
            {/* Traffic Light Controls */}
            <button
              onClick={handleClose}
              className={`w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors duration-200 flex items-center justify-center group aspect-square ${
                prefersReducedMotion ? '' : 'hover:scale-110'
              }`}
              title="Close"
            >
              <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={handleMinimize}
              className={`w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200 flex items-center justify-center group aspect-square ${
                prefersReducedMotion ? '' : 'hover:scale-110'
              }`}
              title="Minimize"
            >
              <Minus className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={handleMaximize}
              className={`w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors duration-200 flex items-center justify-center group aspect-square ${
                prefersReducedMotion ? '' : 'hover:scale-110'
              }`}
              title={windowState === 'maximized' ? 'Restore Window' : 'Maximize Window'}
            >
              <div className={`transition-transform duration-200 ${windowState === 'maximized' ? 'rotate-45' : ''}`}>
                <Plus className="w-2 h-2 text-green-800 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </div>
          <div className="text-gray-400 text-xs font-medium">
            {windowState === 'maximized' ? 'fetchConsultants.js — Maximized' : 'fetchConsultants.js'}
          </div>
          <div className="w-12"></div> {/* Spacer for balance */}
        </div>

        {/* Window Content */}
        <div className="p-4 bg-gray-900 dark:bg-gray-800 font-mono text-sm min-h-[300px]">
          <div className="space-y-1">
            {renderTypedContent()}
            
            {/* Show console output after typing is complete */}
            {typingComplete && (
              <div className="mt-4">
                {/* Console.log output simulation */}
                <div className={`transition-all duration-500 ease-in-out transform ${showConsoleOutput ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  <div className="text-gray-300 text-sm mb-2">
                    <pre className="whitespace-pre-wrap text-gray-400">{JSON.stringify(jsonResponse, null, 2)}</pre>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-3 text-gray-500 text-xs">
              {showConsoleOutput 
                ? '// Console output displayed ✓'
                : typingComplete 
                ? '// Function executed, loading output...'
                : '// Typing in progress...'
              }
            </div>
          </div>
        </div>

        {/* Bottom resize handle (visual only) */}
        <div className="h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-30"></div>
      </div>

      {/* Dock icon when minimized (visual effect) */}
      {windowState === 'minimized' && isVisible && (
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
          <div className={`w-12 h-12 bg-gray-800 rounded-lg shadow-lg border border-gray-600 flex items-center justify-center ${
            prefersReducedMotion ? '' : 'animate-bounce'
          }`}>
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          </div>
          <div className="text-center mt-1 text-xs text-gray-500 dark:text-gray-400">
            Terminal
          </div>
        </div>
      )}
    </div>
  );
};

const ClientShowcase = () => {
  const prefersReducedMotion = useMotionPreference();
  const [isPaused, setIsPaused] = useState(false);

  // Auto-pause marquee if user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPaused(true);
    }
  }, [prefersReducedMotion]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-custom-dark transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Trusted by Industry Leaders
            </h2>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-custom-dark-lighter shadow-md hover:shadow-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                prefersReducedMotion ? '' : 'transition-shadow duration-200'
              } ${prefersReducedMotion ? 'ring-2 ring-amber-400' : ''}`}
              aria-label={`${isPaused || prefersReducedMotion ? "Enable" : "Disable"} marquee animation${prefersReducedMotion ? ' (currently using scrollbar due to motion preference)' : isPaused ? ' (currently using scrollbar)' : ''}`}
              title={
                prefersReducedMotion 
                  ? "Motion reduced - using horizontal scrollbar. Click to enable animation." 
                  : isPaused 
                    ? "Animation paused - using horizontal scrollbar. Click to enable animation."
                    : "Animation active. Click to pause and show scrollbar."
              }
            >
              {isPaused || prefersReducedMotion ? (
                <Play className="w-4 h-4 ml-0.5" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Leading the Way with Experience and Dedication That Earns Your Trust
          </p>
        </div>
        
        <div className="relative">
          {(isPaused || prefersReducedMotion) ? (
            // Static horizontal scroll version for paused/reduced motion
            <div 
              className="overflow-x-auto py-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500"
              role="region"
              aria-label="Company logos - scroll horizontally to view all"
            >
              <div className="flex gap-6 w-max px-6">
                {clients.map((client, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0"
                  >
                    <div 
                      className={`w-24 h-24 rounded-lg border-2 border-gray-200 dark:border-custom-dark bg-white dark:bg-custom-dark-lighter shadow-md flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:border-emerald-300 dark:hover:border-emerald-500 ${
                        prefersReducedMotion ? '' : 'transition-all duration-300'
                      }`}
                      role="img"
                      aria-label={`${client.name} logo`}
                    >
                      <img
                        src={client.logo}
                        alt=""
                        aria-hidden="true"
                        className={`object-contain ${
                          // Make specific logos larger if they appear too small
                          ['KTH', 'Sveriges Riksbank', 'PostNord', 'Axfood', 'Dorian Collective', 'Skandia', 'Mars', 'Adlibris', 'Uppsala Universitet'].includes(client.name) 
                            ? 'w-14 h-14' 
                            : 'w-12 h-12'
                        }`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Animated marquee version
            <Marquee className="relative overflow-hidden py-8">
              <div className="absolute top-0 bottom-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-white dark:from-[rgb(21,22,24)] to-transparent" />
              <div className="absolute top-0 bottom-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-white dark:from-[rgb(21,22,24)] to-transparent" />
              <MarqueeContent 
                pauseOnHover={!isPaused} 
                autoFill 
                play={!isPaused}
                className="[--duration:45s]"
              >
                {clients.map((client, index) => (
                  <MarqueeItem key={index} className="mx-6">
                    <div 
                      className={`w-24 h-24 rounded-lg border-2 border-gray-200 dark:border-custom-dark bg-white dark:bg-custom-dark-lighter shadow-md flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:border-emerald-300 dark:hover:border-emerald-500 ${
                        prefersReducedMotion ? '' : 'transition-all duration-300'
                      }`}
                      role="img"
                      aria-label={`${client.name} logo`}
                    >
                      <img
                        src={client.logo}
                        alt=""
                        aria-hidden="true"
                        className={`object-contain ${
                          // Make specific logos larger if they appear too small
                          ['KTH', 'Sveriges Riksbank', 'PostNord', 'Axfood', 'Dorian Collective', 'Skandia', 'Mars', 'Adlibris', 'Uppsala Universitet'].includes(client.name) 
                            ? 'w-14 h-14' 
                            : 'w-12 h-12'
                        }`}
                        loading="lazy"
                      />
                    </div>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          )}
        </div>
        
        <div className="text-center mt-8">
          {(isPaused || prefersReducedMotion) && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              💡 Scroll horizontally to view all company logos
            </p>
          )}
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              {/* Enhanced Mac Window */}
              <MacWindow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;