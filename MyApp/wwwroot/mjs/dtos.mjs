/* Options:
Date: 2025-05-17 00:18:51
Version: 8.80
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://localhost:5001

//AddServiceStackTypes: True
//AddDocAnnotations: True
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/

"use strict";
export class QueryBase {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index:string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?number} */
    skip;
    /** @type {?number} */
    take;
    /** @type {string} */
    orderBy;
    /** @type {string} */
    orderByDesc;
    /** @type {string} */
    include;
    /** @type {string} */
    fields;
    /** @type {{ [index:string]: string; }} */
    meta;
}
/** @typedef T {any} */
export class QueryDb extends QueryBase {
    /** @param {{skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index:string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
}
export class AuditBase {
    /** @param {{createdDate?:string,createdBy?:string,modifiedDate?:string,modifiedBy?:string,deletedDate?:string,deletedBy?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    createdDate;
    /** @type {string} */
    createdBy;
    /** @type {string} */
    modifiedDate;
    /** @type {string} */
    modifiedBy;
    /** @type {?string} */
    deletedDate;
    /** @type {string} */
    deletedBy;
}
/** @typedef {'Single'|'Double'|'Queen'|'Twin'|'Suite'} */
export var RoomType;
(function (RoomType) {
    RoomType["Single"] = "Single"
    RoomType["Double"] = "Double"
    RoomType["Queen"] = "Queen"
    RoomType["Twin"] = "Twin"
    RoomType["Suite"] = "Suite"
})(RoomType || (RoomType = {}));
export class Coupon {
    /** @param {{id?:string,description?:string,discount?:number,expiryDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {string} */
    description;
    /** @type {number} */
    discount;
    /** @type {string} */
    expiryDate;
}
export class User {
    /** @param {{id?:string,userName?:string,firstName?:string,lastName?:string,displayName?:string,profileUrl?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {string} */
    userName;
    /** @type {?string} */
    firstName;
    /** @type {?string} */
    lastName;
    /** @type {?string} */
    displayName;
    /** @type {?string} */
    profileUrl;
}
export class Booking extends AuditBase {
    /** @param {{id?:number,name?:string,roomType?:RoomType,roomNumber?:number,bookingStartDate?:string,bookingEndDate?:string,cost?:number,couponId?:string,discount?:Coupon,notes?:string,cancelled?:boolean,employee?:User,createdDate?:string,createdBy?:string,modifiedDate?:string,modifiedBy?:string,deletedDate?:string,deletedBy?:string}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
    /** @type {RoomType} */
    roomType;
    /** @type {number} */
    roomNumber;
    /** @type {string} */
    bookingStartDate;
    /** @type {?string} */
    bookingEndDate;
    /** @type {number} */
    cost;
    /** @type {?string} */
    couponId;
    /** @type {Coupon} */
    discount;
    /** @type {?string} */
    notes;
    /** @type {?boolean} */
    cancelled;
    /** @type {User} */
    employee;
}
export class ComfyTask {
    /** @param {{id?:number,name?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    name;
}
export class ResponseError {
    /** @param {{errorCode?:string,fieldName?:string,message?:string,meta?:{ [index:string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    errorCode;
    /** @type {string} */
    fieldName;
    /** @type {string} */
    message;
    /** @type {{ [index:string]: string; }} */
    meta;
}
export class ResponseStatus {
    /** @param {{errorCode?:string,message?:string,stackTrace?:string,errors?:ResponseError[],meta?:{ [index:string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    errorCode;
    /** @type {string} */
    message;
    /** @type {string} */
    stackTrace;
    /** @type {ResponseError[]} */
    errors;
    /** @type {{ [index:string]: string; }} */
    meta;
}
/** @typedef {'TextToImage'|'ImageToImage'|'ImageToText'|'TextToAudio'|'TextToVideo'|'TextTo3D'|'AudioToText'|'VideoToText'|'ImageToVideo'} */
export var ComfyWorkflowType;
(function (ComfyWorkflowType) {
    ComfyWorkflowType["TextToImage"] = "TextToImage"
    ComfyWorkflowType["ImageToImage"] = "ImageToImage"
    ComfyWorkflowType["ImageToText"] = "ImageToText"
    ComfyWorkflowType["TextToAudio"] = "TextToAudio"
    ComfyWorkflowType["TextToVideo"] = "TextToVideo"
    ComfyWorkflowType["TextTo3D"] = "TextTo3D"
    ComfyWorkflowType["AudioToText"] = "AudioToText"
    ComfyWorkflowType["VideoToText"] = "VideoToText"
    ComfyWorkflowType["ImageToVideo"] = "ImageToVideo"
})(ComfyWorkflowType || (ComfyWorkflowType = {}));
/** @typedef {'Text'|'Image'|'Video'|'Audio'} */
export var ComfyPrimarySource;
(function (ComfyPrimarySource) {
    ComfyPrimarySource["Text"] = "Text"
    ComfyPrimarySource["Image"] = "Image"
    ComfyPrimarySource["Video"] = "Video"
    ComfyPrimarySource["Audio"] = "Audio"
})(ComfyPrimarySource || (ComfyPrimarySource = {}));
/** @typedef {'Unknown'|'Audio'|'Boolean'|'Clip'|'ClipVision'|'ClipVisionOutput'|'Combo'|'Conditioning'|'ControlNet'|'Enum'|'FasterWhisperModel'|'Filepath'|'Fl2Model'|'Float'|'Floats'|'Gligen'|'Guider'|'Hooks'|'Image'|'Int'|'Latent'|'LatentOperation'|'Load3D'|'Load3DAnimation'|'Mask'|'Mesh'|'Model'|'Noise'|'Photomaker'|'Sampler'|'Sigmas'|'String'|'StyleModel'|'Subtitle'|'TranscriptionPipeline'|'Transcriptions'|'UpscaleModel'|'VAE'|'VHSAudio'|'Voxel'|'WavBytes'|'WavBytesBatch'|'Webcam'} */
export var ComfyInputType;
(function (ComfyInputType) {
    ComfyInputType["Unknown"] = "Unknown"
    ComfyInputType["Audio"] = "Audio"
    ComfyInputType["Boolean"] = "Boolean"
    ComfyInputType["Clip"] = "Clip"
    ComfyInputType["ClipVision"] = "ClipVision"
    ComfyInputType["ClipVisionOutput"] = "ClipVisionOutput"
    ComfyInputType["Combo"] = "Combo"
    ComfyInputType["Conditioning"] = "Conditioning"
    ComfyInputType["ControlNet"] = "ControlNet"
    ComfyInputType["Enum"] = "Enum"
    ComfyInputType["FasterWhisperModel"] = "FasterWhisperModel"
    ComfyInputType["Filepath"] = "Filepath"
    ComfyInputType["Fl2Model"] = "Fl2Model"
    ComfyInputType["Float"] = "Float"
    ComfyInputType["Floats"] = "Floats"
    ComfyInputType["Gligen"] = "Gligen"
    ComfyInputType["Guider"] = "Guider"
    ComfyInputType["Hooks"] = "Hooks"
    ComfyInputType["Image"] = "Image"
    ComfyInputType["Int"] = "Int"
    ComfyInputType["Latent"] = "Latent"
    ComfyInputType["LatentOperation"] = "LatentOperation"
    ComfyInputType["Load3D"] = "Load3D"
    ComfyInputType["Load3DAnimation"] = "Load3DAnimation"
    ComfyInputType["Mask"] = "Mask"
    ComfyInputType["Mesh"] = "Mesh"
    ComfyInputType["Model"] = "Model"
    ComfyInputType["Noise"] = "Noise"
    ComfyInputType["Photomaker"] = "Photomaker"
    ComfyInputType["Sampler"] = "Sampler"
    ComfyInputType["Sigmas"] = "Sigmas"
    ComfyInputType["String"] = "String"
    ComfyInputType["StyleModel"] = "StyleModel"
    ComfyInputType["Subtitle"] = "Subtitle"
    ComfyInputType["TranscriptionPipeline"] = "TranscriptionPipeline"
    ComfyInputType["Transcriptions"] = "Transcriptions"
    ComfyInputType["UpscaleModel"] = "UpscaleModel"
    ComfyInputType["VAE"] = "VAE"
    ComfyInputType["VHSAudio"] = "VHSAudio"
    ComfyInputType["Voxel"] = "Voxel"
    ComfyInputType["WavBytes"] = "WavBytes"
    ComfyInputType["WavBytesBatch"] = "WavBytesBatch"
    ComfyInputType["Webcam"] = "Webcam"
})(ComfyInputType || (ComfyInputType = {}));
export class ComfyInput {
    /** @param {{classType?:string,nodeId?:number,valueIndex?:number,name?:string,label?:string,type?:ComfyInputType,tooltip?:string,default?:Object,min?:number,max?:number,step?:number,round?:number,multiline?:boolean,dynamicPrompts?:boolean,controlAfterGenerate?:boolean,enumValues?:string[],comboValues?:{ [index:string]: Object; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    classType;
    /** @type {number} */
    nodeId;
    /** @type {number} */
    valueIndex;
    /** @type {string} */
    name;
    /** @type {string} */
    label;
    /** @type {ComfyInputType} */
    type;
    /** @type {?string} */
    tooltip;
    /** @type {?Object} */
    default;
    /** @type {?number} */
    min;
    /** @type {?number} */
    max;
    /** @type {?number} */
    step;
    /** @type {?number} */
    round;
    /** @type {?boolean} */
    multiline;
    /** @type {?boolean} */
    dynamicPrompts;
    /** @type {?boolean} */
    controlAfterGenerate;
    /** @type {?string[]} */
    enumValues;
    /** @type {?{ [index:string]: Object; }} */
    comboValues;
}
export class ComfyWorkflowInfo {
    /** @param {{name?:string,path?:string,type?:ComfyWorkflowType,input?:ComfyPrimarySource,output?:ComfyPrimarySource,inputs?:ComfyInput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {string} */
    path;
    /** @type {ComfyWorkflowType} */
    type;
    /** @type {ComfyPrimarySource} */
    input;
    /** @type {ComfyPrimarySource} */
    output;
    /** @type {ComfyInput[]} */
    inputs = [];
}
export class ComfyTextOutput {
    /** @param {{nodeId?:string,text?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    nodeId;
    /** @type {?string} */
    text;
}
/** @typedef {'Image'|'Video'|'Audio'|'Text'|'Binary'} */
export var AssetType;
(function (AssetType) {
    AssetType["Image"] = "Image"
    AssetType["Video"] = "Video"
    AssetType["Audio"] = "Audio"
    AssetType["Text"] = "Text"
    AssetType["Binary"] = "Binary"
})(AssetType || (AssetType = {}));
export class ComfyAssetOutput {
    /** @param {{nodeId?:string,url?:string,type?:AssetType,fileName?:string,width?:number,height?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    nodeId;
    /** @type {string} */
    url;
    /** @type {AssetType} */
    type;
    /** @type {string} */
    fileName;
    /** @type {?number} */
    width;
    /** @type {?number} */
    height;
}
export class ComfyResult {
    /** @param {{promptId?:string,clientId?:string,duration?:string,texts?:ComfyTextOutput[],assets?:ComfyAssetOutput[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    promptId;
    /** @type {?string} */
    clientId;
    /** @type {?string} */
    duration;
    /** @type {?ComfyTextOutput[]} */
    texts;
    /** @type {?ComfyAssetOutput[]} */
    assets;
}
export class PageStats {
    /** @param {{label?:string,total?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    label;
    /** @type {number} */
    total;
}
/** @typedef T {any} */
export class QueryResponse {
    /** @param {{offset?:number,total?:number,results?:T[],meta?:{ [index:string]: string; },responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    offset;
    /** @type {number} */
    total;
    /** @type {T[]} */
    results;
    /** @type {{ [index:string]: string; }} */
    meta;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class AnalyticsLogInfo {
    /** @param {{id?:number,dateTime?:string,browser?:string,device?:string,bot?:string,op?:string,userId?:string,userName?:string,apiKey?:string,ip?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    dateTime;
    /** @type {string} */
    browser;
    /** @type {string} */
    device;
    /** @type {string} */
    bot;
    /** @type {string} */
    op;
    /** @type {string} */
    userId;
    /** @type {string} */
    userName;
    /** @type {string} */
    apiKey;
    /** @type {string} */
    ip;
}
export class RequestSummary {
    /** @param {{name?:string,totalRequests?:number,totalRequestLength?:number,minRequestLength?:number,maxRequestLength?:number,totalDuration?:number,minDuration?:number,maxDuration?:number,status?:{ [index:number]: number; },durations?:{ [index:string]: number; },apis?:{ [index:string]: number; },users?:{ [index:string]: number; },ips?:{ [index:string]: number; },apiKeys?:{ [index:string]: number; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    name;
    /** @type {number} */
    totalRequests;
    /** @type {number} */
    totalRequestLength;
    /** @type {number} */
    minRequestLength;
    /** @type {number} */
    maxRequestLength;
    /** @type {number} */
    totalDuration;
    /** @type {number} */
    minDuration;
    /** @type {number} */
    maxDuration;
    /** @type {{ [index:number]: number; }} */
    status;
    /** @type {{ [index:string]: number; }} */
    durations;
    /** @type {{ [index:string]: number; }} */
    apis;
    /** @type {{ [index:string]: number; }} */
    users;
    /** @type {{ [index:string]: number; }} */
    ips;
    /** @type {{ [index:string]: number; }} */
    apiKeys;
}
export class AnalyticsReports {
    /** @param {{id?:number,created?:string,version?:number,apis?:{ [index:string]: RequestSummary; },users?:{ [index:string]: RequestSummary; },tags?:{ [index:string]: RequestSummary; },status?:{ [index:string]: RequestSummary; },days?:{ [index:string]: RequestSummary; },apiKeys?:{ [index:string]: RequestSummary; },ips?:{ [index:string]: RequestSummary; },browsers?:{ [index:string]: RequestSummary; },devices?:{ [index:string]: RequestSummary; },bots?:{ [index:string]: RequestSummary; },durations?:{ [index:string]: number; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    created;
    /** @type {number} */
    version;
    /** @type {{ [index:string]: RequestSummary; }} */
    apis;
    /** @type {{ [index:string]: RequestSummary; }} */
    users;
    /** @type {{ [index:string]: RequestSummary; }} */
    tags;
    /** @type {{ [index:string]: RequestSummary; }} */
    status;
    /** @type {{ [index:string]: RequestSummary; }} */
    days;
    /** @type {{ [index:string]: RequestSummary; }} */
    apiKeys;
    /** @type {{ [index:string]: RequestSummary; }} */
    ips;
    /** @type {{ [index:string]: RequestSummary; }} */
    browsers;
    /** @type {{ [index:string]: RequestSummary; }} */
    devices;
    /** @type {{ [index:string]: RequestSummary; }} */
    bots;
    /** @type {{ [index:string]: number; }} */
    durations;
}
export class ComfyTasksResponse {
    /** @param {{results?:ComfyTask[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ComfyTask[]} */
    results = [];
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class RegisterComfyAgentResponse {
    /** @param {{id?:number,apiKey?:string,deviceId?:string,nodes?:string[],checkpoints?:string[],unets?:string[],vaes?:string[],loras?:string[],clips?:string[],clipVisions?:string[],upscalers?:string[],controlnets?:string[],embeddings?:string[],stylers?:string[],gligens?:string[],photoMakers?:string[],responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {string} */
    apiKey;
    /** @type {string} */
    deviceId;
    /** @type {string[]} */
    nodes = [];
    /** @type {string[]} */
    checkpoints = [];
    /** @type {string[]} */
    unets = [];
    /** @type {string[]} */
    vaes = [];
    /** @type {string[]} */
    loras = [];
    /** @type {string[]} */
    clips = [];
    /** @type {string[]} */
    clipVisions = [];
    /** @type {string[]} */
    upscalers = [];
    /** @type {string[]} */
    controlnets = [];
    /** @type {string[]} */
    embeddings = [];
    /** @type {string[]} */
    stylers = [];
    /** @type {string[]} */
    gligens = [];
    /** @type {string[]} */
    photoMakers = [];
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class GetComfyWorkflowInfoResponse {
    /** @param {{result?:ComfyWorkflowInfo,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ComfyWorkflowInfo} */
    result;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class QueueComfyWorkflowResponse {
    /** @param {{mediaProviderId?:number,refId?:string,promptId?:string,jobId?:number,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    mediaProviderId;
    /** @type {string} */
    refId;
    /** @type {string} */
    promptId;
    /** @type {number} */
    jobId;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class GetExecutedComfyWorkflowResultsResponse {
    /** @param {{result?:ComfyResult,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {ComfyResult} */
    result;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class GetExecutedComfyWorkflowsResultsResponse {
    /** @param {{results?:{ [index:string]: ComfyResult; },errors?:{ [index:string]: ResponseStatus; },responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?{ [index:string]: ComfyResult; }} */
    results;
    /** @type {?{ [index:string]: ResponseStatus; }} */
    errors;
    /** @type {?ResponseStatus} */
    responseStatus;
}
export class HelloResponse {
    /** @param {{result?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    result;
}
export class AdminDataResponse {
    /** @param {{pageStats?:PageStats[]}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {PageStats[]} */
    pageStats = [];
}
export class AuthenticateResponse {
    /** @param {{userId?:string,sessionId?:string,userName?:string,displayName?:string,referrerUrl?:string,bearerToken?:string,refreshToken?:string,refreshTokenExpiry?:string,profileUrl?:string,roles?:string[],permissions?:string[],authProvider?:string,responseStatus?:ResponseStatus,meta?:{ [index:string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    userId;
    /** @type {string} */
    sessionId;
    /** @type {string} */
    userName;
    /** @type {string} */
    displayName;
    /** @type {string} */
    referrerUrl;
    /** @type {string} */
    bearerToken;
    /** @type {string} */
    refreshToken;
    /** @type {?string} */
    refreshTokenExpiry;
    /** @type {string} */
    profileUrl;
    /** @type {string[]} */
    roles;
    /** @type {string[]} */
    permissions;
    /** @type {string} */
    authProvider;
    /** @type {ResponseStatus} */
    responseStatus;
    /** @type {{ [index:string]: string; }} */
    meta;
}
export class IdResponse {
    /** @param {{id?:string,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class GetAnalyticsInfoResponse {
    /** @param {{months?:string[],result?:AnalyticsLogInfo,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string[]} */
    months;
    /** @type {AnalyticsLogInfo} */
    result;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class GetAnalyticsReportsResponse {
    /** @param {{result?:AnalyticsReports,responseStatus?:ResponseStatus}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {AnalyticsReports} */
    result;
    /** @type {ResponseStatus} */
    responseStatus;
}
export class GetComfyTasks {
    /** @param {{deviceId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    deviceId;
    getTypeName() { return 'GetComfyTasks' }
    getMethod() { return 'GET' }
    createResponse() { return new ComfyTasksResponse() }
}
export class RegisterComfyAgent {
    /** @param {{deviceId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    deviceId;
    getTypeName() { return 'RegisterComfyAgent' }
    getMethod() { return 'POST' }
    createResponse() { return new RegisterComfyAgentResponse() }
}
export class GetComfyWorkflows {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'GetComfyWorkflows' }
    getMethod() { return 'GET' }
    createResponse() { return [] }
}
export class GetComfyWorkflowInfo {
    /** @param {{workflow?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    workflow;
    getTypeName() { return 'GetComfyWorkflowInfo' }
    getMethod() { return 'GET' }
    createResponse() { return new GetComfyWorkflowInfoResponse() }
}
export class GetComfyApiPrompt {
    /** @param {{workflow?:string,args?:{ [index:string]: Object; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    workflow;
    /** @type {?{ [index:string]: Object; }} */
    args;
    getTypeName() { return 'GetComfyApiPrompt' }
    getMethod() { return 'GET' }
    createResponse() { return '' }
}
export class QueueComfyWorkflow {
    /** @param {{workflow?:string,args?:{ [index:string]: Object; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    workflow;
    /** @type {?{ [index:string]: Object; }} */
    args;
    getTypeName() { return 'QueueComfyWorkflow' }
    getMethod() { return 'POST' }
    createResponse() { return new QueueComfyWorkflowResponse() }
}
export class GetExecutedComfyWorkflowResults {
    /** @param {{refId?:string,poll?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    refId;
    /** @type {?boolean} */
    poll;
    getTypeName() { return 'GetExecutedComfyWorkflowResults' }
    getMethod() { return 'GET' }
    createResponse() { return new GetExecutedComfyWorkflowResultsResponse() }
}
export class GetExecutedComfyWorkflowsResults {
    /** @param {{refIds?:string[],poll?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string[]} */
    refIds = [];
    /** @type {?boolean} */
    poll;
    getTypeName() { return 'GetExecutedComfyWorkflowsResults' }
    getMethod() { return 'GET' }
    createResponse() { return new GetExecutedComfyWorkflowsResultsResponse() }
}
export class Hello {
    /** @param {{name?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    name;
    getTypeName() { return 'Hello' }
    getMethod() { return 'GET' }
    createResponse() { return new HelloResponse() }
}
export class AdminData {
    constructor(init) { Object.assign(this, init) }
    getTypeName() { return 'AdminData' }
    getMethod() { return 'GET' }
    createResponse() { return new AdminDataResponse() }
}
export class Authenticate {
    /** @param {{provider?:string,userName?:string,password?:string,rememberMe?:boolean,accessToken?:string,accessTokenSecret?:string,returnUrl?:string,errorView?:string,meta?:{ [index:string]: string; }}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description AuthProvider, e.g. credentials */
    provider;
    /** @type {string} */
    userName;
    /** @type {string} */
    password;
    /** @type {?boolean} */
    rememberMe;
    /** @type {string} */
    accessToken;
    /** @type {string} */
    accessTokenSecret;
    /** @type {string} */
    returnUrl;
    /** @type {string} */
    errorView;
    /** @type {{ [index:string]: string; }} */
    meta;
    getTypeName() { return 'Authenticate' }
    getMethod() { return 'POST' }
    createResponse() { return new AuthenticateResponse() }
}
export class QueryBookings extends QueryDb {
    /** @param {{id?:number,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index:string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?number} */
    id;
    getTypeName() { return 'QueryBookings' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryCoupons extends QueryDb {
    /** @param {{id?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index:string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {string} */
    id;
    getTypeName() { return 'QueryCoupons' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class QueryUsers extends QueryDb {
    /** @param {{id?:string,skip?:number,take?:number,orderBy?:string,orderByDesc?:string,include?:string,fields?:string,meta?:{ [index:string]: string; }}} [init] */
    constructor(init) { super(init); Object.assign(this, init) }
    /** @type {?string} */
    id;
    getTypeName() { return 'QueryUsers' }
    getMethod() { return 'GET' }
    createResponse() { return new QueryResponse() }
}
export class CreateBooking {
    /** @param {{name?:string,roomType?:RoomType,roomNumber?:number,cost?:number,bookingStartDate?:string,bookingEndDate?:string,notes?:string,couponId?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /**
     * @type {string}
     * @description Name this Booking is for */
    name;
    /** @type {RoomType} */
    roomType;
    /** @type {number} */
    roomNumber;
    /** @type {number} */
    cost;
    /** @type {string} */
    bookingStartDate;
    /** @type {?string} */
    bookingEndDate;
    /** @type {?string} */
    notes;
    /** @type {?string} */
    couponId;
    getTypeName() { return 'CreateBooking' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class UpdateBooking {
    /** @param {{id?:number,name?:string,roomType?:RoomType,roomNumber?:number,cost?:number,bookingStartDate?:string,bookingEndDate?:string,notes?:string,couponId?:string,cancelled?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    /** @type {?string} */
    name;
    /** @type {?RoomType} */
    roomType;
    /** @type {?number} */
    roomNumber;
    /** @type {?number} */
    cost;
    /** @type {?string} */
    bookingStartDate;
    /** @type {?string} */
    bookingEndDate;
    /** @type {?string} */
    notes;
    /** @type {?string} */
    couponId;
    /** @type {?boolean} */
    cancelled;
    getTypeName() { return 'UpdateBooking' }
    getMethod() { return 'PATCH' }
    createResponse() { return new IdResponse() }
}
export class DeleteBooking {
    /** @param {{id?:number}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {number} */
    id;
    getTypeName() { return 'DeleteBooking' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class CreateCoupon {
    /** @param {{id?:string,description?:string,discount?:number,expiryDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {string} */
    description;
    /** @type {number} */
    discount;
    /** @type {string} */
    expiryDate;
    getTypeName() { return 'CreateCoupon' }
    getMethod() { return 'POST' }
    createResponse() { return new IdResponse() }
}
export class UpdateCoupon {
    /** @param {{id?:string,description?:string,discount?:number,expiryDate?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    /** @type {string} */
    description;
    /** @type {number} */
    discount;
    /** @type {string} */
    expiryDate;
    getTypeName() { return 'UpdateCoupon' }
    getMethod() { return 'PATCH' }
    createResponse() { return new IdResponse() }
}
export class DeleteCoupon {
    /** @param {{id?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {string} */
    id;
    getTypeName() { return 'DeleteCoupon' }
    getMethod() { return 'DELETE' }
    createResponse() { }
}
export class GetAnalyticsInfo {
    /** @param {{month?:string,type?:string,op?:string,apiKey?:string,userId?:string,ip?:string}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    month;
    /** @type {string} */
    type;
    /** @type {string} */
    op;
    /** @type {string} */
    apiKey;
    /** @type {string} */
    userId;
    /** @type {string} */
    ip;
    getTypeName() { return 'GetAnalyticsInfo' }
    getMethod() { return 'GET' }
    createResponse() { return new GetAnalyticsInfoResponse() }
}
export class GetAnalyticsReports {
    /** @param {{month?:string,filter?:string,value?:string,force?:boolean}} [init] */
    constructor(init) { Object.assign(this, init) }
    /** @type {?string} */
    month;
    /** @type {string} */
    filter;
    /** @type {string} */
    value;
    /** @type {?boolean} */
    force;
    getTypeName() { return 'GetAnalyticsReports' }
    getMethod() { return 'GET' }
    createResponse() { return new GetAnalyticsReportsResponse() }
}

