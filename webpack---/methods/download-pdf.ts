import { getCurrentInstance } from '@wix/business-manager-api';
import axios, { AxiosInstance } from 'axios';
import { saveAs } from 'file-saver';
import { MethodFn } from 'yoshi-flow-bm-runtime';

const apiUrl = '/_api/price-quotes-server/v1';
const extract = <T>({ data }: { data: T }) => data;
type Downloader = (data: any, fileName: string) => void;
export class PDFDownloader {
  private readonly client: AxiosInstance;
  private readonly downloader: Downloader;
  private readonly instanceId: string;
  private readonly route: 'price-quote' | 'invoice';

  constructor({
    appInstance,
    instanceId,
    downloader,
    route,
  }: {
    appInstance: string;
    instanceId: string;
    route: 'price-quote' | 'invoice';
    downloader?: Downloader;
  }) {
    this.client = axios.create({
      headers: {
        Authorization: appInstance,
      },
      responseType: 'blob',
    });

    this.downloader = downloader || saveAs;
    this.instanceId = instanceId;
    this.route = route;
  }

  public download({ id, fileName }: { id: string; fileName: string }) {
    return this.client
      .get(`${apiUrl}/${this.route}/${this.instanceId}:${id}/pdf`)
      .then(extract)
      .then((data) => {
        this.downloader(data, `${fileName}.pdf`);
      });
  }
}

type Request = {
  route: 'price-quote' | 'invoice';
  id: string;
  fileName: string;
};

const downloadPdf: MethodFn = (flowAPI, request: Request) => {
  const { instanceId } = flowAPI.moduleParams;
  const instance = getCurrentInstance(flowAPI.moduleInfo.appDefId!);
  const downloader = new PDFDownloader({
    instanceId,
    appInstance: instance,
    route: request.route,
  });
  return downloader.download(request);
};

export default downloadPdf;
