export declare type IConfig = Array<{
    funcName: string;
    importDecla: string;
}> | {
    funcName: string;
    importDecla: string;
};
export default function config(config: IConfig): () => (node: any) => any;
