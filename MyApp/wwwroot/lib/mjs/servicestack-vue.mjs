var ho = Object.defineProperty;
var go = (e, t, s) => t in e ? ho(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var Le = (e, t, s) => (go(e, typeof t != "symbol" ? t + "" : t, s), s);
import { computed as v, inject as Je, defineComponent as ue, openBlock as o, createElementBlock as r, mergeProps as Se, withModifiers as Ue, renderSlot as z, ref as I, nextTick as jt, isRef as un, unref as J, provide as ms, watchEffect as Ss, normalizeClass as g, createElementVNode as l, createCommentVNode as L, toDisplayString as T, h as Ft, resolveComponent as Q, createBlock as ne, withCtx as $e, useAttrs as yo, createVNode as we, createTextVNode as _e, normalizeStyle as vl, Fragment as Me, renderList as Ie, withDirectives as Bt, vModelCheckbox as pl, withKeys as dn, createStaticVNode as Ds, vModelSelect as bo, useSlots as Ps, getCurrentInstance as He, onMounted as at, createSlots as ml, normalizeProps as Xt, guardReactiveProps as As, vModelDynamic as wo, onUnmounted as Et, watch as Lt, vModelText as ko, resolveDynamicComponent as cn, resolveDirective as _o } from "vue";
import { lastRightPart as Ot, leftPart as js, map as Ge, toDate as kt, toDateTime as $o, toCamelCase as Co, mapGet as ke, chop as xo, enc as sl, omit as gt, appendQueryString as Yt, fromXsdDuration as fn, isDate as Bs, timeFmt12 as Lo, dateFmt as Vo, apiValue as Mo, indexOfAny as So, createBus as Ao, toKebabCase as Yl, toTime as Fo, lastLeftPart as vn, setQueryString as To, nameOf as Io, ApiResult as tt, ResponseStatus as Ys, ResponseError as en, sanitize as Do, errorResponseExcept as Po, humanize as Re, delaySet as pn, rightPart as xs, queryString as ll, combinePaths as jo, toPascalCase as ft, errorResponse as _t, trimEnd as Bo, $1 as Fs, HttpMethods as hl, omitEmpty as Oo, uniqueKeys as nl, humanify as mn, each as Ho } from "@servicestack/client";
const hn = "png,jpg,jpeg,jfif,gif,svg,webp".split(","), gn = {
  img: "png,jpg,jpeg,gif,svg,webp,png,jpg,jpeg,gif,bmp,tif,tiff,webp,ai,psd,ps".split(","),
  vid: "avi,m4v,mov,mp4,mpg,mpeg,wmv,webm".split(","),
  aud: "mp3,mpa,ogg,wav,wma,mid,webm".split(","),
  ppt: "key,odp,pps,ppt,pptx".split(","),
  xls: "xls,xlsm,xlsx,ods,csv,tsv".split(","),
  doc: "doc,docx,pdf,rtf,tex,txt,md,rst,xls,xlsm,xlsx,ods,key,odp,pps,ppt,pptx".split(","),
  zip: "zip,tar,gz,7z,rar,gzip,deflate,br,iso,dmg,z,lz,lz4,lzh,s7z,apl,arg,jar,war".split(","),
  exe: "exe,bat,sh,cmd,com,app,msi,run,vb,vbs,js,ws,wsh".split(","),
  att: "bin,oct,dat".split(",")
  //attachment
}, tn = Object.keys(gn), wt = (e, t) => `<svg xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='img' preserveAspectRatio='xMidYMid meet' viewBox='${e}'>${t}</svg>`, Ls = {
  img: wt("4 4 16 16", "<path fill='currentColor' d='M20 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-2 0H6v6.38l2.19-2.19l5.23 5.23l1-1a1.59 1.59 0 0 1 2.11.11L18 16V6zm-5 3.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0z'/>"),
  vid: wt("0 0 24 24", "<path fill='currentColor' d='m14 2l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8m4 18V9h-5V4H6v16h12m-2-2l-2.5-1.7V18H8v-5h5.5v1.7L16 13v5Z'/>"),
  aud: wt("0 0 24 24", "<path fill='currentColor' d='M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6zm10-9h-4v3.88a2.247 2.247 0 0 0-3.5 1.87c0 1.24 1.01 2.25 2.25 2.25S13 17.99 13 16.75V13h3v-2z'/>"),
  ppt: wt("0 0 48 48", "<g fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='4'><path d='M4 8h40'/><path d='M8 8h32v26H8V8Z' clip-rule='evenodd'/><path d='m22 16l5 5l-5 5m-6 16l8-8l8 8'/></g>"),
  xls: wt("0 0 256 256", "<path fill='currentColor' d='M200 26H72a14 14 0 0 0-14 14v26H40a14 14 0 0 0-14 14v96a14 14 0 0 0 14 14h18v26a14 14 0 0 0 14 14h128a14 14 0 0 0 14-14V40a14 14 0 0 0-14-14Zm-42 76h44v52h-44Zm44-62v50h-44V80a14 14 0 0 0-14-14h-2V38h58a2 2 0 0 1 2 2ZM70 40a2 2 0 0 1 2-2h58v28H70ZM38 176V80a2 2 0 0 1 2-2h104a2 2 0 0 1 2 2v96a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2Zm32 40v-26h60v28H72a2 2 0 0 1-2-2Zm130 2h-58v-28h2a14 14 0 0 0 14-14v-10h44v50a2 2 0 0 1-2 2ZM69.2 148.4L84.5 128l-15.3-20.4a6 6 0 1 1 9.6-7.2L92 118l13.2-17.6a6 6 0 0 1 9.6 7.2L99.5 128l15.3 20.4a6 6 0 0 1-9.6 7.2L92 138l-13.2 17.6a6 6 0 1 1-9.6-7.2Z'/>"),
  doc: wt("0 0 32 32", "<path fill='currentColor' d='M26 30H11a2.002 2.002 0 0 1-2-2v-6h2v6h15V6h-9V4h9a2.002 2.002 0 0 1 2 2v22a2.002 2.002 0 0 1-2 2Z'/><path fill='currentColor' d='M17 10h7v2h-7zm-1 5h8v2h-8zm-1 5h9v2h-9zm-6-1a5.005 5.005 0 0 1-5-5V3h2v11a3 3 0 0 0 6 0V5a1 1 0 0 0-2 0v10H8V5a3 3 0 0 1 6 0v9a5.005 5.005 0 0 1-5 5z'/>"),
  zip: wt("0 0 16 16", "<g fill='currentColor'><path d='M6.5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V7.5zm2 0h-1v.938a1 1 0 0 1-.03.243l-.4 1.598l.93.62l.93-.62l-.4-1.598a1 1 0 0 1-.03-.243V7.5z'/><path d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm5.5-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9v1H8v1h1v1H8v1h1v1H7.5V5h-1V4h1V3h-1V2h1V1z'/></g>"),
  exe: wt("0 0 16 16", "<path fill='currentColor' fill-rule='evenodd' d='M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM2.575 15.202H.785v-1.073H2.47v-.606H.785v-1.025h1.79v-.648H0v3.999h2.575v-.647ZM6.31 11.85h-.893l-.823 1.439h-.036l-.832-1.439h-.931l1.227 1.983l-1.239 2.016h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992L6.31 11.85Zm1.025 3.352h1.79v.647H6.548V11.85h2.576v.648h-1.79v1.025h1.684v.606H7.334v1.073Z'/>"),
  att: wt("0 0 24 24", "<path fill='currentColor' d='M14 0a5 5 0 0 1 5 5v12a7 7 0 1 1-14 0V9h2v8a5 5 0 0 0 10 0V5a3 3 0 1 0-6 0v12a1 1 0 1 0 2 0V6h2v11a3 3 0 1 1-6 0V5a5 5 0 0 1 5-5Z'/>")
}, Ro = /[\r\n%#()<>?[\\\]^`{|}]/g, sn = 1024, Eo = ["Bytes", "KB", "MB", "GB", "TB"], No = (() => {
  const e = "application/", t = e + "vnd.openxmlformats-officedocument.", s = "image/", n = "text/", a = "audio/", i = "video/", u = {
    jpg: s + "jpeg",
    tif: s + "tiff",
    svg: s + "svg+xml",
    ico: s + "x-icon",
    ts: n + "typescript",
    py: n + "x-python",
    sh: n + "x-sh",
    mp3: a + "mpeg3",
    mpg: i + "mpeg",
    ogv: i + "ogg",
    xlsx: t + "spreadsheetml.sheet",
    xltx: t + "spreadsheetml.template",
    docx: t + "wordprocessingml.document",
    dotx: t + "wordprocessingml.template",
    pptx: t + "presentationml.presentation",
    potx: t + "presentationml.template",
    ppsx: t + "presentationml.slideshow",
    mdb: e + "vnd.ms-access"
  };
  function d(f, m) {
    f.split(",").forEach(($) => u[$] = m);
  }
  function c(f, m) {
    f.split(",").forEach(($) => u[$] = m($));
  }
  return c("jpeg,gif,png,tiff,bmp,webp", (f) => s + f), c("jsx,csv,css", (f) => n + f), c("aac,ac3,aiff,m4a,m4b,m4p,mid,midi,wav", (f) => a + f), c("3gpp,avi,dv,divx,ogg,mp4,webm", (f) => i + f), c("rtf,pdf", (f) => e + f), d("htm,html,shtm", n + "html"), d("js,mjs,cjs", n + "javascript"), d("yml,yaml", e + "yaml"), d("bat,cmd", e + "bat"), d("xml,csproj,fsproj,vbproj", n + "xml"), d("txt,ps1", n + "plain"), d("qt,mov", i + "quicktime"), d("doc,dot", e + "msword"), d("xls,xlt,xla", e + "excel"), d("ppt,oit,pps,ppa", e + "vnd.ms-powerpoint"), d("cer,crt,der", e + "x-x509-ca-cert"), d("gz,tgz,zip,rar,lzh,z", e + "x-compressed"), d("aaf,aca,asd,bin,cab,chm,class,cur,db,dat,deploy,dll,dsp,exe,fla,ics,inf,mix,msi,mso,obj,ocx,prm,prx,psd,psp,qxd,sea,snp,so,sqlite,toc,ttf,u32,xmp,xsn,xtp", e + "octet-stream"), u;
})();
let ol = [];
function yn(e) {
  return e = e.replace(/"/g, "'"), e = e.replace(/>\s+</g, "><"), e = e.replace(/\s{2,}/g, " "), e.replace(Ro, encodeURIComponent);
}
function gl(e) {
  return "data:image/svg+xml;utf8," + yn(e);
}
function bn(e) {
  let t = URL.createObjectURL(e);
  return ol.push(t), t;
}
function wn() {
  ol.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch (t) {
      console.error("URL.revokeObjectURL", t);
    }
  }), ol = [];
}
function yl(e) {
  if (!e)
    return null;
  let t = js(e, "?");
  return Ot(t, "/");
}
function hs(e) {
  let t = yl(e);
  return t == null || t.indexOf(".") === -1 ? null : Ot(t, ".").toLowerCase();
}
function bl(e) {
  let t = hs(e.name);
  return t && hn.indexOf(t) >= 0 ? bn(e) : Tt(e.name);
}
function wl(e) {
  if (!e)
    return !1;
  if (e.startsWith("blob:") || e.startsWith("data:"))
    return !0;
  let t = hs(e);
  return t && hn.indexOf(t) >= 0 || !1;
}
function Tt(e) {
  if (!e)
    return null;
  let t = hs(e);
  return t == null || wl(e) ? e : is(t) || gl(Ls.doc);
}
function is(e) {
  let t = kn(e);
  return t && gl(t) || null;
}
function kn(e) {
  if (Ls[e])
    return Ls[e];
  for (let t = 0; t < tn.length; t++) {
    let s = tn[t];
    if (gn[s].indexOf(e) >= 0)
      return Ls[s];
  }
  return null;
}
function kl(e, t = 2) {
  if (e === 0)
    return "0 Bytes";
  const s = t < 0 ? 0 : t, n = Math.floor(Math.log(e) / Math.log(sn));
  return parseFloat((e / Math.pow(sn, n)).toFixed(s)) + " " + Eo[n];
}
function zo(e) {
  return e.files && Array.from(e.files).map((t) => ({ fileName: t.name, contentLength: t.size, filePath: bl(t) }));
}
function Os(e, t) {
  e.onerror = null, e.src = _l(e.src, t) || "";
}
function _l(e, t) {
  return is(Ot(e, ".").toLowerCase()) || (t ? is(t) || t : null) || is("doc");
}
function al(e) {
  if (!e)
    throw new Error("fileNameOrExt required");
  const t = Ot(e, ".").toLowerCase();
  return No[t] || "application/" + t;
}
function Uo() {
  return {
    extSvg: kn,
    extSrc: is,
    getExt: hs,
    encodeSvg: yn,
    canPreview: wl,
    getFileName: yl,
    getMimeType: al,
    formatBytes: kl,
    filePathUri: Tt,
    svgToDataUri: gl,
    fileImageUri: bl,
    objectUrl: bn,
    flush: wn,
    inputFiles: zo,
    iconOnError: Os,
    iconFallbackSrc: _l
  };
}
class qo {
  constructor(t) {
    Le(this, "view");
    Le(this, "includeTypes");
    Object.assign(this, t);
  }
  getTypeName() {
    return "MetadataApp";
  }
  getMethod() {
    return "GET";
  }
  createResponse() {
    return {};
  }
}
const es = "/metadata/app.json", Qo = {
  Boolean: "checkbox",
  DateTime: "date",
  DateOnly: "date",
  DateTimeOffset: "date",
  TimeSpan: "time",
  TimeOnly: "time",
  Byte: "number",
  Short: "number",
  Int64: "number",
  Int32: "number",
  UInt16: "number",
  UInt32: "number",
  UInt64: "number",
  Single: "number",
  Double: "number",
  Decimal: "number",
  String: "text",
  Guid: "text",
  Uri: "text"
}, Ko = {
  number: "Int32",
  checkbox: "Boolean",
  date: "DateTime",
  "datetime-local": "DateTime",
  time: "TimeSpan"
}, rl = {
  Byte: "byte",
  Int16: "short",
  Int32: "int",
  Int64: "long",
  UInt16: "ushort",
  Unt32: "uint",
  UInt64: "ulong",
  Single: "float",
  Double: "double",
  Decimal: "decimal"
};
[...Object.keys(rl), ...Object.values(rl)];
const Zo = {
  String: "string",
  Boolean: "bool",
  ...rl
};
function _s(e) {
  return Zo[e] || e;
}
function _n(e, t) {
  return e ? (t || (t = []), e === "Nullable`1" ? _s(t[0]) + "?" : e.endsWith("[]") ? `List<${_s(e.substring(0, e.length - 2))}>` : t.length === 0 ? _s(e) : js(_s(e), "`") + "<" + t.join(",") + ">") : "";
}
function Wo(e) {
  return e && _n(e.name, e.genericArgs);
}
class Ht {
  constructor() {
    Le(this, "Query");
    Le(this, "QueryInto");
    Le(this, "Create");
    Le(this, "Update");
    Le(this, "Patch");
    Le(this, "Delete");
  }
  get AnyQuery() {
    return this.Query || this.QueryInto;
  }
  get AnyUpdate() {
    return this.Patch || this.Update;
  }
  get dataModel() {
    var t;
    return (t = this.AnyQuery) == null ? void 0 : t.dataModel;
  }
  toArray() {
    return [this.Query, this.QueryInto, this.Create, this.Update, this.Patch, this.Delete].filter((s) => !!s).map((s) => s);
  }
  get empty() {
    return !this.Query && !this.QueryInto && !this.Create && !this.Update && !this.Patch && !this.Delete;
  }
  add(t) {
    We.isQueryInto(t) && !this.QueryInto ? this.QueryInto = t : We.isQuery(t) && !this.Query ? this.Query = t : We.isCreate(t) && !this.Create ? this.Create = t : We.isUpdate(t) && !this.Update ? this.Update = t : We.isPatch(t) && !this.Patch ? this.Patch = t : We.isDelete(t) && !this.Delete && (this.Delete = t);
  }
  static from(t) {
    const s = new Ht();
    return t.forEach((n) => {
      s.add(n);
    }), s;
  }
  static forType(t, s) {
    var a;
    let n = new Ht();
    if (X.config.apisResolver && t) {
      const i = X.config.apisResolver(t, s);
      i && (n.Query = i.Query, n.QueryInto = i.QueryInto, n.Create = i.Create, n.Update = i.Update, n.Patch = i.Patch, n.Delete = i.Delete);
    }
    return t && (s ?? (s = (a = X.metadata.value) == null ? void 0 : a.api), s == null || s.operations.forEach((i) => {
      var u;
      ((u = i.dataModel) == null ? void 0 : u.name) == t && n.add(i);
    })), n;
  }
}
const We = {
  Create: "ICreateDb`1",
  Update: "IUpdateDb`1",
  Patch: "IPatchDb`1",
  Delete: "IDeleteDb`1",
  AnyRead: ["QueryDb`1", "QueryDb`2"],
  AnyWrite: ["ICreateDb`1", "IUpdateDb`1", "IPatchDb`1", "IDeleteDb`1"],
  isAnyQuery: (e) => Ge(e.request.inherits, (t) => We.AnyRead.indexOf(t.name) >= 0),
  isQuery: (e) => Ge(e.request.inherits, (t) => t.name === "QueryDb`1"),
  isQueryInto: (e) => Ge(e.request.inherits, (t) => t.name === "QueryDb`2"),
  isCrud: (e) => {
    var t;
    return (t = e.request.implements) == null ? void 0 : t.some((s) => We.AnyWrite.indexOf(s.name) >= 0);
  },
  isCreate: (e) => $s(e, We.Create),
  isUpdate: (e) => $s(e, We.Update),
  isPatch: (e) => $s(e, We.Patch),
  isDelete: (e) => $s(e, We.Delete),
  model: (e) => {
    var t, s, n;
    return e ? Ge(e.inherits, (a) => We.AnyRead.indexOf(a.name) >= 0) ? (t = e.inherits) == null ? void 0 : t.genericArgs[0] : (n = (s = e.implements) == null ? void 0 : s.find((a) => We.AnyWrite.indexOf(a.name) >= 0)) == null ? void 0 : n.genericArgs[0] : null;
  }
};
function Go(e) {
  var t;
  return ((t = e.input) == null ? void 0 : t.type) || Hs($l(e));
}
function $n(e) {
  return e.endsWith("?") ? xo(e, 1) : e;
}
function Hs(e) {
  return Qo[$n(e)];
}
function Jo(e) {
  return e && Ko[e] || "String";
}
function $l(e) {
  return e.type === "Nullable`1" ? e.genericArgs[0] : e.type;
}
function il(e) {
  return e && Hs(e) == "number" || !1;
}
function Cn(e) {
  return e && e.toLowerCase() == "string" || !1;
}
function Xo(e) {
  return e == "List`1" || e.startsWith("List<") || e.endsWith("[]");
}
function xn(e) {
  if (!(e != null && e.type))
    return !1;
  const t = $l(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum ? !1 : Hs(e.type) == null;
}
function Ln(e) {
  var s, n, a, i;
  if (!(e != null && e.type))
    return !1;
  const t = $l(e);
  return e.isValueType && t.indexOf("`") == -1 || e.isEnum || ((s = e.input) == null ? void 0 : s.type) == "hidden" || ((n = e.input) == null ? void 0 : n.type) == "file" || ((a = e.input) == null ? void 0 : a.type) == "tag" || ((i = e.input) == null ? void 0 : i.type) == "combobox" ? !0 : Hs(e.type) != null;
}
function cs(e, t) {
  let s = typeof e == "string" ? Rs(e) : e;
  s || (console.warn(`Metadata not found for: ${e}`), s = { request: { name: e } });
  let n = (
    /** @class */
    function() {
      return function(i) {
        Object.assign(this, i);
      };
    }()
  ), a = (
    /** @class */
    function() {
      function i(u) {
        Object.assign(this, u);
      }
      return i.prototype.createResponse = function() {
        return s.returnsVoid ? void 0 : new n();
      }, i.prototype.getTypeName = function() {
        return s.request.name;
      }, i.prototype.getMethod = function() {
        return s.method || "POST";
      }, i;
    }()
  );
  return new a(t);
}
function Yo(e, t, s = {}) {
  let n = (
    /** @class */
    function() {
      return function(i) {
        Object.assign(this, i);
      };
    }()
  ), a = (
    /** @class */
    function() {
      function i(u) {
        Object.assign(this, u);
      }
      return i.prototype.createResponse = function() {
        return typeof s.createResponse == "function" ? s.createResponse() : new n();
      }, i.prototype.getTypeName = function() {
        return e;
      }, i.prototype.getMethod = function() {
        return s.method || "POST";
      }, i;
    }()
  );
  return new a(t);
}
function us(e, t) {
  return e ? (Object.keys(e).forEach((s) => {
    let n = e[s];
    typeof n == "string" ? n.startsWith("/Date") && (e[s] = zs(kt(n))) : n != null && typeof n == "object" && (Array.isArray(n) ? e[s] = Array.from(n) : e[s] = Object.assign({}, n));
  }), e) : {};
}
function ea(e, t) {
  let s = {};
  return Array.from(e.elements).forEach((n) => {
    var m;
    let a = n;
    if (!a.id || a.value == null || a.value === "")
      return;
    const i = a.id.toLowerCase(), u = t && t.find(($) => $.name.toLowerCase() == i);
    let d = u == null ? void 0 : u.type, c = (m = u == null ? void 0 : u.genericArgs) == null ? void 0 : m[0], f = a.type === "checkbox" ? a.checked : a.value;
    il(d) ? f = Number(f) : d === "List`1" && typeof f == "string" && (f = f.split(",").map(($) => il(c) ? Number($) : $)), s[a.id] = f;
  }), s;
}
function Cl(e) {
  var t;
  return ((t = e == null ? void 0 : e.api) == null ? void 0 : t.operations) && e.api.operations.length > 0;
}
function ta(e) {
  if (!xl() && (e != null && e.assert) && !X.metadata.value)
    throw new Error("useMetadata() not configured, see: https://docs.servicestack.net/vue/use-metadata");
  return X.metadata.value;
}
function fs(e) {
  return e && Cl(e) ? (e.date = $o(/* @__PURE__ */ new Date()), X.metadata.value = e, typeof localStorage < "u" && localStorage.setItem(es, JSON.stringify(e)), !0) : !1;
}
function sa() {
  X.metadata.value = null, typeof localStorage < "u" && localStorage.removeItem(es);
}
function xl() {
  if (X.metadata.value != null)
    return !0;
  let e = globalThis.Server;
  if (Cl(e))
    fs(e);
  else {
    const t = typeof localStorage < "u" ? localStorage.getItem(es) : null;
    if (t)
      try {
        fs(JSON.parse(t));
      } catch {
        console.error(`Could not JSON.parse ${es} from localStorage`);
      }
  }
  return X.metadata.value != null;
}
async function ln(e, t) {
  let s = t ? await t() : await fetch(e);
  if (s.ok) {
    let n = await s.text();
    fs(JSON.parse(n));
  } else
    console.error(`Could not download ${t ? "AppMetadata" : e}: ${s.statusText}`);
  Cl(X.metadata.value) || console.warn("AppMetadata is not available");
}
async function la(e) {
  var i;
  const { olderThan: t, resolvePath: s, resolve: n } = e || {};
  let a = xl() && t !== 0;
  if (a && t) {
    let u = kt((i = X.metadata.value) == null ? void 0 : i.date);
    (!u || (/* @__PURE__ */ new Date()).getTime() - u.getTime() > t) && (a = !1);
  }
  if (!a) {
    if ((s || n) && (await ln(s || es, n), X.metadata.value != null))
      return;
    const u = Je("client");
    if (u != null) {
      const d = await u.api(new qo());
      d.succeeded && fs(d.response);
    }
    if (X.metadata.value != null)
      return;
    await ln(es);
  }
  return X.metadata.value;
}
function vt(e, t) {
  var u;
  if (X.config.typeResolver) {
    let d = X.config.typeResolver(e, t);
    if (d)
      return d;
  }
  let s = (u = X.metadata.value) == null ? void 0 : u.api;
  if (!s || !e)
    return null;
  let n = s.types.find((d) => d.name.toLowerCase() === e.toLowerCase() && (!t || d.namespace == t));
  if (n)
    return n;
  let a = Rs(e);
  if (a)
    return a.request;
  let i = s.operations.find((d) => d.response && d.response.name.toLowerCase() === e.toLowerCase() && (!t || d.response.namespace == t));
  return i ? i.response : null;
}
function Rs(e) {
  var n;
  if (X.config.apiResolver) {
    const a = X.config.apiResolver(e);
    if (a)
      return a;
  }
  let t = (n = X.metadata.value) == null ? void 0 : n.api;
  return t ? t.operations.find((a) => a.request.name.toLowerCase() === e.toLowerCase()) : null;
}
function na({ dataModel: e }) {
  var n;
  const t = (n = X.metadata.value) == null ? void 0 : n.api;
  if (!t)
    return [];
  let s = t.operations;
  if (e) {
    const a = typeof e == "string" ? vt(e) : e;
    s = s.filter((i) => Vn(i.dataModel, a));
  }
  return s;
}
function Ll(e) {
  return e ? vt(e.name, e.namespace) : null;
}
function Vn(e, t) {
  return e && t && e.name === t.name && (!e.namespace || !t.namespace || e.namespace === t.namespace);
}
function oa(e, t) {
  let s = vt(e);
  return s && s.properties && s.properties.find((a) => a.name.toLowerCase() === t.toLowerCase());
}
function Mn(e) {
  return Sn(vt(e));
}
function Sn(e) {
  if (e && e.isEnum && e.enumNames != null) {
    let t = {};
    for (let s = 0; s < e.enumNames.length; s++) {
      const n = (e.enumDescriptions ? e.enumDescriptions[s] : null) || e.enumNames[s], a = (e.enumValues != null ? e.enumValues[s] : null) || e.enumNames[s];
      t[a] = n;
    }
    return t;
  }
  return null;
}
function An(e) {
  if (!e)
    return null;
  let t = {}, s = e.input && e.input.allowableEntries;
  if (s) {
    for (let a = 0; a < s.length; a++) {
      let i = s[a];
      t[i.key] = i.value;
    }
    return t;
  }
  let n = e.allowableValues || (e.input ? e.input.allowableValues : null);
  if (n) {
    for (let a = 0; a < n.length; a++) {
      let i = n[a];
      t[i] = i;
    }
    return t;
  }
  if (e.isEnum) {
    const a = e.genericArgs && e.genericArgs.length == 1 ? e.genericArgs[0] : e.type, i = vt(a);
    if (i)
      return Sn(i);
  }
  return null;
}
function Vl(e) {
  if (!e)
    return;
  const t = [];
  return Object.keys(e).forEach((s) => t.push({ key: s, value: e[s] })), t;
}
function aa(e, t) {
  const n = ((a, i) => Object.assign({
    id: a,
    name: a,
    type: i
  }, t))(e.name, (t == null ? void 0 : t.type) || Go(e) || "text");
  return e.isEnum && (n.type = "select", n.allowableEntries = Vl(An(e))), n;
}
function ra(e) {
  let t = [];
  if (e) {
    const s = ot(e), n = Rs(e.name), a = Ll(n == null ? void 0 : n.dataModel);
    s.forEach((i) => {
      var d, c, f;
      if (!Ln(i))
        return;
      const u = aa(i, i.input);
      if (u.id = Co(u.id), u.type == "file" && i.uploadTo && !u.accept) {
        const m = (c = (d = X.metadata.value) == null ? void 0 : d.plugins.filesUpload) == null ? void 0 : c.locations.find(($) => $.name == i.uploadTo);
        m && !u.accept && m.allowExtensions && (u.accept = m.allowExtensions.map(($) => $.startsWith(".") ? $ : `.${$}`).join(","));
      }
      if (a) {
        const m = (f = a.properties) == null ? void 0 : f.find(($) => $.name == i.name);
        i.ref || (i.ref = m == null ? void 0 : m.ref);
      }
      if (u.options)
        try {
          const m = {
            input: u,
            $typeFields: s.map((k) => k.name),
            $dataModelFields: a ? ot(a).map((k) => k.name) : [],
            ...X.config.scopeWhitelist
          }, $ = qs(u.options, m);
          Object.keys($).forEach((k) => {
            u[k] = $[k];
          });
        } catch {
          console.error(`failed to evaluate '${u.options}'`);
        }
      t.push(u);
    });
  }
  return t;
}
function Ml(e, t) {
  var a, i;
  if (!t.type)
    return console.error("enumDescriptions missing {type:'EnumType'} options"), [`${e}`];
  const s = vt(t.type);
  if (!(s != null && s.enumValues))
    return console.error(`Could not find metadata for ${t.type}`), [`${e}`];
  const n = [];
  for (let u = 0; u < s.enumValues.length; u++) {
    const d = parseInt(s.enumValues[u]);
    d > 0 && (d & e) === d && n.push(((a = s.enumDescriptions) == null ? void 0 : a[u]) || ((i = s.enumNames) == null ? void 0 : i[u]) || `${e}`);
  }
  return n;
}
function Fn(e) {
  return (t) => typeof t == "number" ? Ml(t, { type: e }) : t;
}
function ot(e) {
  if (!e)
    return [];
  let t = [], s = {};
  function n(a) {
    a.forEach((i) => {
      s[i.name] || (s[i.name] = 1, t.push(i));
    });
  }
  for (; e; )
    e.properties && n(e.properties), e = e.inherits ? Ll(e.inherits) : null;
  return t.map((a) => a.type.endsWith("[]") ? { ...a, type: "List`1", genericArgs: [a.type.substring(0, a.type.length - 2)] } : a);
}
function $s(e, t) {
  var s;
  return ((s = e.request.implements) == null ? void 0 : s.some((n) => n.name === t)) || !1;
}
function ss(e) {
  return e ? Tn(e, ot(e)) : null;
}
function Tn(e, t) {
  let s = t.find((i) => i.name.toLowerCase() === "id");
  if (s && s.isPrimaryKey)
    return s;
  let a = t.find((i) => i.isPrimaryKey) || s;
  if (!a) {
    let i = We.model(e);
    if (i)
      return Ge(vt(i), (u) => ss(u));
    console.error(`Primary Key not found in ${e.name}`);
  }
  return a || null;
}
function ia(e, t) {
  return Ge(ss(e), (s) => ke(t, s.name));
}
function In(e, t, s) {
  return e && e.valueType === "none" ? "" : s.key === "%In" || s.key === "%Between" ? `(${s.value})` : ua(t, s.value);
}
function ua(e, t) {
  return e ? (e = $n(e), il(e) || e === "Boolean" ? t : Xo(e) ? `[${t}]` : `'${t}'`) : t;
}
function Ct(e, t) {
  return { name: e, value: t };
}
const da = [
  Ct("=", "%"),
  Ct("!=", "%!"),
  Ct(">=", ">%"),
  Ct(">", "%>"),
  Ct("<=", "%<"),
  Ct("<", "<%"),
  Ct("In", "%In"),
  Ct("Between", "%Between"),
  { name: "Starts With", value: "%StartsWith", types: "string" },
  { name: "Contains", value: "%Contains", types: "string" },
  { name: "Ends With", value: "%EndsWith", types: "string" },
  { name: "Exists", value: "%IsNotNull", valueType: "none" },
  { name: "Not Exists", value: "%IsNull", valueType: "none" }
];
function ut() {
  const e = v(() => {
    var n;
    return ((n = X.metadata.value) == null ? void 0 : n.app) || null;
  }), t = v(() => {
    var n;
    return ((n = X.metadata.value) == null ? void 0 : n.api) || null;
  }), s = v(() => {
    var n, a, i;
    return ((i = (a = (n = X.metadata.value) == null ? void 0 : n.plugins) == null ? void 0 : a.autoQuery) == null ? void 0 : i.viewerConventions) || da;
  });
  return xl(), {
    loadMetadata: la,
    getMetadata: ta,
    setMetadata: fs,
    clearMetadata: sa,
    metadataApp: e,
    metadataApi: t,
    filterDefinitions: s,
    typeOf: vt,
    typeOfRef: Ll,
    typeEquals: Vn,
    apiOf: Rs,
    findApis: na,
    typeName: Wo,
    typeName2: _n,
    property: oa,
    enumOptions: Mn,
    propertyOptions: An,
    createFormLayout: ra,
    typeProperties: ot,
    supportsProp: Ln,
    Crud: We,
    Apis: Ht,
    getPrimaryKey: ss,
    getPrimaryKeyByProps: Tn,
    getId: ia,
    createDto: cs,
    makeDto: Yo,
    toFormValues: us,
    formValues: ea,
    isComplexProp: xn,
    asKvps: Vl,
    expandEnumFlags: Ml,
    enumFlagsConverter: Fn
  };
}
const rt = class rt {
  static async getOrFetchValue(t, s, n, a, i, u, d) {
    const c = rt.getValue(n, d, i);
    return c ?? (await rt.fetchLookupIds(t, s, n, a, i, u, [d]), rt.getValue(n, d, i));
  }
  static getValue(t, s, n) {
    const a = rt.Lookup[t];
    if (a) {
      const i = a[s];
      if (i)
        return n = n.toLowerCase(), i[n];
    }
  }
  static setValue(t, s, n, a) {
    const i = rt.Lookup[t] ?? (rt.Lookup[t] = {}), u = i[s] ?? (i[s] = {});
    n = n.toLowerCase(), u[n] = a;
  }
  static setRefValue(t, s) {
    const n = ke(s, t.refId);
    if (n == null || t.refLabel == null)
      return null;
    const a = ke(s, t.refLabel);
    return rt.setValue(t.model, n, t.refLabel, a), a;
  }
  static async fetchLookupIds(t, s, n, a, i, u, d) {
    const c = s.operations.find((f) => {
      var m;
      return We.isAnyQuery(f) && ((m = f.dataModel) == null ? void 0 : m.name) == n;
    });
    if (c) {
      const f = rt.Lookup[n] ?? (rt.Lookup[n] = {}), m = [];
      Object.keys(f).forEach((F) => {
        const H = f[F];
        ke(H, i) && m.push(F);
      });
      const $ = d.filter((F) => !m.includes(F));
      if ($.length == 0)
        return;
      const k = u ? null : `${a},${i}`, p = {
        [a + "In"]: $.join(",")
      };
      k && (p.fields = k);
      const y = cs(c, p), _ = await t.api(y, { jsconfig: "edv,eccn" });
      if (_.succeeded)
        (ke(_.response, "results") || []).forEach((H) => {
          if (!ke(H, a)) {
            console.error(`result[${a}] == null`, H);
            return;
          }
          const ae = `${ke(H, a)}`, N = ke(H, i);
          i = i.toLowerCase();
          const R = f[ae] ?? (f[ae] = {});
          R[i] = `${N}`;
        });
      else {
        console.error(`Failed to call ${c.request.name}`);
        return;
      }
    }
  }
};
Le(rt, "Lookup", {});
let Wt = rt, ul = () => (/* @__PURE__ */ new Date()).getTime(), ca = ["/", "T", ":", "-"], mt = {
  //locale: null,
  assumeUtc: !0,
  //number: null,
  date: {
    method: "Intl.DateTimeFormat",
    options: "{dateStyle:'medium'}"
  },
  maxFieldLength: 150,
  maxNestedFields: 2,
  maxNestedFieldLength: 30
}, fa = new Intl.RelativeTimeFormat(mt.locale, {}), nn = 24 * 60 * 60 * 1e3 * 365, el = {
  year: nn,
  month: nn / 12,
  day: 24 * 60 * 60 * 1e3,
  hour: 60 * 60 * 1e3,
  minute: 60 * 1e3,
  second: 1e3
}, It = {
  currency: Pn,
  bytes: jn,
  link: Bn,
  linkTel: On,
  linkMailTo: Hn,
  icon: Rn,
  iconRounded: En,
  attachment: Nn,
  hidden: zn,
  time: Un,
  relativeTime: Al,
  relativeTimeFromMs: Es,
  enumFlags: Qn,
  formatDate: ls,
  formatNumber: Sl
};
"iconOnError" in globalThis || (globalThis.iconOnError = Os);
class Ye {
}
Le(Ye, "currency", { method: "currency" }), Le(Ye, "bytes", { method: "bytes" }), Le(Ye, "link", { method: "link" }), Le(Ye, "linkTel", { method: "linkTel" }), Le(Ye, "linkMailTo", { method: "linkMailTo" }), Le(Ye, "icon", { method: "icon" }), Le(Ye, "iconRounded", { method: "iconRounded" }), Le(Ye, "attachment", { method: "attachment" }), Le(Ye, "time", { method: "time" }), Le(Ye, "relativeTime", { method: "relativeTime" }), Le(Ye, "relativeTimeFromMs", { method: "relativeTimeFromMs" }), Le(Ye, "date", { method: "formatDate" }), Le(Ye, "number", { method: "formatNumber" }), Le(Ye, "hidden", { method: "hidden" }), Le(Ye, "enumFlags", { method: "enumFlags" });
function va(e) {
  mt = Object.assign({}, mt, e);
}
function pa(e) {
  Object.keys(e || {}).forEach((t) => {
    typeof e[t] == "function" && (It[t] = e[t]);
  });
}
function Dn() {
  return It;
}
function gs(e, t) {
  return t ? ht("span", e, t) : e;
}
function Pn(e, t) {
  const s = gt(t, ["currency"]);
  return gs(new Intl.NumberFormat(void 0, { style: "currency", currency: (t == null ? void 0 : t.currency) || "USD" }).format(e), s);
}
function jn(e, t) {
  return gs(kl(e), t);
}
function Bn(e, t) {
  return ht("a", e, Us({ ...t, href: e }));
}
function On(e, t) {
  return ht("a", e, Us({ ...t, href: `tel:${e}` }));
}
function Hn(e, t) {
  t || (t = {});
  let { subject: s, body: n } = t, a = gt(t, ["subject", "body"]), i = {};
  return s && (i.subject = s), n && (i.body = n), ht("a", e, Us({ ...a, href: `mailto:${Yt(e, i)}` }));
}
function Rn(e, t) {
  return ht("img", void 0, Object.assign({ class: "w-6 h-6", title: e, src: Jt(e), onerror: "iconOnError(this)" }, t));
}
function En(e, t) {
  return ht("img", void 0, Object.assign({ class: "w-8 h-8 rounded-full", title: e, src: Jt(e), onerror: "iconOnError(this)" }, t));
}
function Nn(e, t) {
  let s = yl(e), a = hs(s) == null || wl(e) ? Jt(e) : _l(e);
  const i = Jt(a);
  let u = t && (t["icon-class"] || t.iconClass), d = ht("img", void 0, Object.assign({ class: "w-6 h-6", src: i, onerror: "iconOnError(this,'att')" }, u ? { class: u } : null)), c = `<span class="pl-1">${s}</span>`;
  return ht("a", d + c, Object.assign({ class: "flex", href: Jt(e), title: e }, t ? gt(t, ["icon-class", "iconClass"]) : null));
}
function zn(e) {
  return "";
}
function Un(e, t) {
  let s = typeof e == "string" ? new Date(fn(e) * 1e3) : Bs(e) ? kt(e) : null;
  return gs(s ? Lo(s) : e, t);
}
function ls(e, t) {
  if (e == null)
    return "";
  let s = typeof e == "number" ? new Date(e) : typeof e == "string" ? kt(e) : e;
  if (!Bs(s))
    return console.warn(`${s} is not a Date value`), e == null ? "" : `${e}`;
  let n = mt.date ? Ns(mt.date) : null;
  return gs(typeof n == "function" ? n(s) : Vo(s), t);
}
function Sl(e, t) {
  if (typeof e != "number")
    return e;
  let s = mt.number ? Ns(mt.number) : null, n = typeof s == "function" ? s(e) : `${e}`;
  return n === "" && (console.warn(`formatNumber(${e}) => ${n}`, s), n = `${e}`), gs(n, t);
}
function Vs(e) {
  const t = Math.floor(e / 1e3), s = Math.floor(t / 60), n = Math.floor(s / 60), a = Math.floor(n / 24);
  return a > 0 ? `${a}d ${Vs(e - a * 24 * 60 * 6e4)}` : n > 0 ? `${n}h ${Vs(e - n * 60 * 6e4)}` : s > 0 ? `${s}m ${Vs(e - s * 6e4)}` : t > 0 ? `${t}s` : `${e}ms`;
}
function ma(e) {
  return e >= 1e9 ? (e / 1e9).toFixed(1) + "b" : e >= 1e6 ? (e / 1e6).toFixed(1) + "m" : e >= 1e3 ? (e / 1e3).toFixed(1) + "k" : e.toLocaleString();
}
function qn(e, t, s) {
  let n = Mo(e), a = t ? Ns(t) : null;
  if (typeof a == "function") {
    let u = s;
    if (t != null && t.options)
      try {
        u = qs(t.options, s);
      } catch (d) {
        console.error(`Could not evaluate '${t.options}'`, d, ", with scope:", s);
      }
    return a(e, u);
  }
  let i = n != null ? Bs(n) ? ls(n, s) : typeof n == "number" ? Sl(n, s) : n : null;
  return i ?? "";
}
function vs(e, t, s) {
  return Rt(e) ? qn(e, t, s) : wa(e, t, s);
}
function ha(e) {
  if (e == null)
    return NaN;
  if (typeof e == "number")
    return e;
  if (Bs(e))
    return e.getTime() - ul();
  if (typeof e == "string") {
    let t = Number(e);
    if (!isNaN(t))
      return t;
    if (e[0] === "P" || e.startsWith("-P"))
      return fn(e) * 1e3 * -1;
    if (So(e, ca) >= 0)
      return kt(e).getTime() - ul();
  }
  return NaN;
}
function Es(e, t) {
  for (let s in el)
    if (Math.abs(e) > el[s] || s === "second")
      return (t || fa).format(Math.round(e / el[s]), s);
}
function Al(e, t) {
  let s = ha(e);
  return isNaN(s) ? "" : Es(s, t);
}
function ga(e, t) {
  return Es(e.getTime() - (t ? t.getTime() : ul()));
}
function Qn(e, t) {
  return Ml(e, t).join(", ");
}
function Ns(e) {
  if (!e)
    return null;
  let { method: t, options: s } = e, n = `${t}(${s})`, a = It[n] || It[t];
  if (typeof a == "function")
    return a;
  let i = e.locale || mt.locale;
  if (t.startsWith("Intl.")) {
    let u = i ? `'${i}'` : "undefined", d = `return new ${t}(${u},${s || "undefined"})`;
    try {
      let c = Function(d)();
      return a = t === "Intl.DateTimeFormat" ? (f) => c.format(kt(f)) : t === "Intl.NumberFormat" ? (f) => c.format(Number(f)) : t === "Intl.RelativeTimeFormat" ? (f) => Al(f, c) : (f) => c.format(f), It[n] = a;
    } catch (c) {
      console.error(`Invalid format: ${d}`, c);
    }
  } else {
    let u = globalThis[t];
    if (typeof u == "function") {
      let d = s != null ? Function("return " + s)() : void 0;
      return a = (c) => u(c, d, i), It[n] = a;
    }
    console.error(`No '${t}' function exists`, Object.keys(It));
  }
  return null;
}
function Kn(e, t) {
  return e ? e.length > t ? e.substring(0, t) + "..." : e : "";
}
function Zn(e) {
  return e.substring(0, 6) === "/Date(" ? ls(kt(e)) : e;
}
function ya(e) {
  return Fl(ts(e)).replace(/"/g, "");
}
function Wn(e) {
  if (e == null || e === "")
    return "";
  if (typeof e == "string")
    try {
      return JSON.parse(e);
    } catch {
      console.warn("couldn't parse as JSON", e);
    }
  return e;
}
function Fl(e, t = 4) {
  return e = Wn(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : JSON.stringify(e, void 0, t);
}
function ba(e) {
  return e = Wn(e), typeof e != "object" ? typeof e == "string" ? e : `${e}` : (e = Object.assign({}, e), e = ts(e), Fl(e));
}
function ts(e) {
  if (e == null)
    return null;
  if (typeof e == "string")
    return Zn(e);
  if (Rt(e))
    return e;
  if (e instanceof Date)
    return ls(e);
  if (Array.isArray(e))
    return e.map(ts);
  if (typeof e == "object") {
    let t = {};
    return Object.keys(e).forEach((s) => {
      s != "__type" && (t[s] = ts(e[s]));
    }), t;
  }
  return e;
}
function wa(e, t, s) {
  let n = e;
  if (Array.isArray(e)) {
    if (Rt(e[0]))
      return n.join(",");
    e[0] != null && (n = e[0]);
  }
  if (n == null)
    return "";
  if (n instanceof Date)
    return ls(n, s);
  let a = Object.keys(n), i = [];
  for (let u = 0; u < Math.min(mt.maxNestedFields, a.length); u++) {
    let d = a[u], c = `${ts(n[d])}`;
    i.push(`<b class="font-medium">${d}</b>: ${sl(Kn(Zn(c), mt.maxNestedFieldLength))}`);
  }
  return a.length > 2 && i.push("..."), ht("span", "{ " + i.join(", ") + " }", Object.assign({ title: sl(ya(e)) }, s));
}
function yg() {
  return {
    Formats: Ye,
    setDefaultFormats: va,
    getFormatters: Dn,
    setFormatters: pa,
    formatValue: vs,
    formatter: Ns,
    dateInputFormat: zs,
    currency: Pn,
    bytes: jn,
    link: Bn,
    linkTel: On,
    linkMailTo: Hn,
    icon: Rn,
    iconRounded: En,
    attachment: Nn,
    hidden: zn,
    time: Un,
    relativeTime: Al,
    relativeTimeFromDate: ga,
    relativeTimeFromMs: Es,
    enumFlags: Qn,
    formatDate: ls,
    formatNumber: Sl,
    humanifyMs: Vs,
    humanifyNumber: ma,
    indentJson: Fl,
    prettyJson: ba,
    scrub: ts,
    truncate: Kn,
    apiValueFmt: qn,
    iconOnError: Os
  };
}
const ka = ["title"], _a = /* @__PURE__ */ ue({
  __name: "RouterLink",
  props: {
    to: {}
  },
  setup(e) {
    const t = e, { config: s } = Nt(), n = () => s.value.navigate(t.to ?? "/");
    return (a, i) => (o(), r("a", Se({
      onClick: Ue(n, ["prevent"]),
      title: a.to,
      href: "javascript:void(0)"
    }, a.$attrs), [
      z(a.$slots, "default")
    ], 16, ka));
  }
});
class $a {
  constructor() {
    Le(this, "callbacks", {});
  }
  register(t, s) {
    this.callbacks[t] = s;
  }
  has(t) {
    return !!this.callbacks[t];
  }
  invoke(t, s) {
    const n = this.callbacks[t];
    typeof n == "function" && n(t, s);
  }
}
class Ca {
  get length() {
    return typeof localStorage > "u" ? 0 : localStorage.length;
  }
  getItem(t) {
    return typeof localStorage > "u" ? null : localStorage.getItem(t);
  }
  setItem(t, s) {
    typeof localStorage > "u" || localStorage.setItem(t, s);
  }
  removeItem(t) {
    typeof localStorage > "u" || localStorage.removeItem(t);
  }
  clear() {
    typeof localStorage > "u" || localStorage.clear();
  }
  key(t) {
    return typeof localStorage > "u" ? null : localStorage.key(t);
  }
}
const it = class it {
  static component(t) {
    const s = it.components[t];
    if (s)
      return s;
    const n = Yl(t), a = Object.keys(it.components).find((i) => Yl(i) === n);
    return a && it.components[a] || null;
  }
};
Le(it, "config", {
  redirectSignIn: "/signin",
  redirectSignOut: "/auth/logout",
  navigate: (t) => location.href = t,
  assetsPathResolver: (t) => t,
  fallbackPathResolver: (t) => t,
  storage: new Ca(),
  tableIcon: { svg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='currentColor' stroke-width='1.5'><path d='M5 12v6s0 3 7 3s7-3 7-3v-6'/><path d='M5 6v6s0 3 7 3s7-3 7-3V6'/><path d='M12 3c7 0 7 3 7 3s0 3-7 3s-7-3-7-3s0-3 7-3Z'/></g></svg>" },
  scopeWhitelist: {
    enumFlagsConverter: Fn,
    ...Dn()
  }
}), Le(it, "autoQueryGridDefaults", {
  deny: [],
  hide: [],
  toolbarButtonClass: void 0,
  tableStyle: "stripedRows",
  take: 25,
  maxFieldLength: 150
}), Le(it, "events", Ao()), Le(it, "user", I(null)), Le(it, "metadata", I(null)), Le(it, "components", {
  RouterLink: _a
}), Le(it, "interceptors", new $a());
let X = it;
function xa(e) {
  X.config = Object.assign(X.config, e);
}
function La(e) {
  X.autoQueryGridDefaults = Object.assign(X.autoQueryGridDefaults, e);
}
function Tl(e) {
  return e && X.config.assetsPathResolver ? X.config.assetsPathResolver(e) : e;
}
function Va(e) {
  return e && X.config.fallbackPathResolver ? X.config.fallbackPathResolver(e) : e;
}
function Ma(e, t) {
  X.interceptors.register(e, t);
}
function Nt() {
  const e = v(() => X.config), t = v(() => X.autoQueryGridDefaults), s = X.events;
  return {
    config: e,
    setConfig: xa,
    events: s,
    autoQueryGridDefaults: t,
    setAutoQueryGridDefaults: La,
    assetsPathResolver: Tl,
    fallbackPathResolver: Va,
    registerInterceptor: Ma
  };
}
function zs(e) {
  if (e == null || typeof e == "object")
    return "";
  const t = kt(e);
  return t == null || t.toString() == "Invalid Date" ? "" : t.toISOString().substring(0, 10) ?? "";
}
function Gn(e) {
  if (e == null || typeof e == "object")
    return "";
  const t = kt(e);
  return t == null || t.toString() == "Invalid Date" ? "" : t.toISOString().substring(0, 19) ?? "";
}
function Jn(e) {
  return e == null ? "" : Fo(e);
}
function Xn(e, t) {
  if (X.config.inputValue)
    return X.config.inputValue(e, t);
  let s = e === "date" ? zs(t) : e === "datetime-local" ? Gn(t) : e === "time" ? Jn(t) : t;
  const n = typeof s;
  return s = s == null ? "" : n == "boolean" || n == "number" ? `${s}` : s, s;
}
function Yn(e, t) {
  e.value = null, jt(() => e.value = t);
}
function Zt(e) {
  return Object.keys(e).forEach((t) => {
    const s = e[t];
    e[t] = un(s) ? J(s) : s;
  }), e;
}
function xt(e, t, s) {
  s ? (t.value = e.entering.cls + " " + e.entering.from, setTimeout(() => t.value = e.entering.cls + " " + e.entering.to, 0)) : (t.value = e.leaving.cls + " " + e.leaving.from, setTimeout(() => t.value = e.leaving.cls + " " + e.leaving.to, 0));
}
function Ms(e) {
  if (typeof document > "u")
    return;
  let t = (e == null ? void 0 : e.after) || document.activeElement, s = t && t.form;
  if (s) {
    let n = ':not([disabled]):not([tabindex="-1"])', a = s.querySelectorAll(`a:not([disabled]), button${n}, input[type=text]${n}, [tabindex]${n}`), i = Array.prototype.filter.call(
      a,
      (d) => d.offsetWidth > 0 || d.offsetHeight > 0 || d === t
    ), u = i.indexOf(t);
    u > -1 && (i[u + 1] || i[0]).focus();
  }
}
function zt(e) {
  if (!e)
    return null;
  if (typeof e == "string")
    return e;
  const t = typeof e == "function" ? new e() : typeof e == "object" ? e : null;
  if (!t)
    throw new Error(`Invalid DTO Type '${typeof e}'`);
  if (typeof t.getTypeName != "function")
    throw new Error(`${JSON.stringify(t)} is not a Request DTO`);
  const s = t.getTypeName();
  if (!s)
    throw new Error("DTO Required");
  return s;
}
function ht(e, t, s) {
  s || (s = {});
  let n = s.cls || s.className || s.class;
  return n && (s = gt(s, ["cls", "class", "className"]), s.class = n), t == null ? `<${e}` + dl(s) + "/>" : `<${e}` + dl(s) + `>${t || ""}</${e}>`;
}
function dl(e) {
  return Object.keys(e).reduce((t, s) => `${t} ${s}="${sl(e[s])}"`, "");
}
function Us(e) {
  return Object.assign({ target: "_blank", rel: "noopener", class: "text-blue-600" }, e);
}
function Jt(e) {
  return Tl(e);
}
let Sa = ["string", "number", "boolean", "null", "undefined"];
function Rt(e) {
  return Sa.indexOf(typeof e) >= 0 || e instanceof Date;
}
function ps(e) {
  return !Rt(e);
}
function Ts(e) {
  return typeof e == "string" ? JSON.parse(e) : null;
}
function Il(e, t) {
  if (typeof history < "u") {
    const s = t ? Yt(vn(location.href, "?"), e) : To(location.href, e);
    history.pushState({}, "", s);
  }
}
function qs(e, t) {
  if (["function", "Function", "eval", "=>", ";"].some((a) => e.includes(a)))
    throw new Error(`Unsafe script: '${e}'`);
  const n = Object.assign(
    Object.keys(globalThis).reduce((a, i) => (a[i] = void 0, a), {}),
    t
  );
  return new Function("with(this) { return (" + e + ") }").call(n);
}
function cl(e) {
  typeof navigator < "u" && navigator.clipboard.writeText(e);
}
function Dl(e) {
  const t = X.config.storage.getItem(e);
  return t ? JSON.parse(t) : null;
}
function Qs(e, t) {
  return Yt(`swr.${Io(e)}`, t ? Object.assign({}, e, t) : e);
}
function Aa(e) {
  if (e.request) {
    const t = Qs(e.request, e.args);
    X.config.storage.removeItem(t);
  }
}
async function eo(e, t, s, n, a) {
  const i = Qs(t, n);
  s(new tt({ response: Dl(i) }));
  const u = await e.api(t, n, a);
  if (u.succeeded && u.response) {
    u.response._date = (/* @__PURE__ */ new Date()).valueOf();
    const d = JSON.stringify(u.response);
    X.config.storage.setItem(i, d), s(u);
  }
  return u;
}
function to(e, t) {
  let s = null;
  return (...n) => {
    s && clearTimeout(s), s = setTimeout(() => {
      e(...n);
    }, t || 100);
  };
}
function Dt(e) {
  return typeof e == "string" ? e.split(",") : e || [];
}
function Pt(e, t) {
  const s = Dt(t);
  return e.reduce((n, a) => (n[a] = !s.includes(a), n), {});
}
function Fa(e) {
  return new Promise((t) => setTimeout(t, e));
}
function so() {
  return {
    dateInputFormat: zs,
    dateTimeInputFormat: Gn,
    timeInputFormat: Jn,
    textInputValue: Xn,
    setRef: Yn,
    unRefs: Zt,
    transition: xt,
    focusNextElement: Ms,
    getTypeName: zt,
    htmlTag: ht,
    htmlAttrs: dl,
    linkAttrs: Us,
    toAppUrl: Jt,
    isPrimitive: Rt,
    isComplexType: ps,
    pushState: Il,
    scopedExpr: qs,
    copyText: cl,
    fromCache: Dl,
    swrCacheKey: Qs,
    swrClear: Aa,
    swrApi: eo,
    asStrings: Dt,
    asOptions: Pt,
    createDebounce: to,
    delay: Fa
  };
}
function ys(e) {
  const t = I(!1), s = I(), n = I(), a = e ?? Je("client");
  function i({ message: y, errorCode: _, fieldName: F, errors: H }) {
    return _ || (_ = "Exception"), H || (H = []), s.value = F ? new Ys({
      errorCode: _,
      message: y,
      errors: [new en({ fieldName: F, errorCode: _, message: y })]
    }) : new Ys({ errorCode: _, message: y, errors: H });
  }
  function u({ fieldName: y, message: _, errorCode: F }) {
    if (F || (F = "Exception"), !s.value)
      i({ fieldName: y, message: _, errorCode: F });
    else {
      let H = new Ys(s.value);
      H.errors = [
        ...(H.errors || []).filter((ae) => {
          var N;
          return ((N = ae.fieldName) == null ? void 0 : N.toLowerCase()) !== (y == null ? void 0 : y.toLowerCase());
        }),
        new en({ fieldName: y, message: _, errorCode: F })
      ], s.value = H;
    }
  }
  async function d(y, _, F) {
    t.value = !0;
    let H = await a.api(Zt(y), _, F);
    return t.value = !1, n.value = H.response, s.value = H.error, H;
  }
  async function c(y, _, F) {
    t.value = !0;
    let H = await a.apiVoid(Zt(y), _, F);
    return t.value = !1, n.value = H.response, s.value = H.error, H;
  }
  async function f(y, _, F, H) {
    t.value = !0;
    let ae = await a.apiForm(Zt(y), _, F, H);
    return t.value = !1, n.value = ae.response, s.value = ae.error, ae;
  }
  async function m(y, _, F, H) {
    t.value = !0;
    let ae = await a.apiFormVoid(Zt(y), _, F, H);
    return t.value = !1, n.value = ae.response, s.value = ae.error, ae;
  }
  async function $(y, _, F, H) {
    return eo(a, y, _, F, H);
  }
  function k(y, _) {
    const F = I(new tt()), H = to(async (ae) => {
      F.value = await a.api(ae);
    }, _ == null ? void 0 : _.delayMs);
    return Ss(async () => {
      const ae = y(), N = Dl(Qs(ae));
      N && (F.value = new tt({ response: N })), (_ == null ? void 0 : _.delayMs) === 0 ? F.value = await a.api(ae) : H(ae);
    }), (async () => F.value = await a.api(y(), _ == null ? void 0 : _.args, _ == null ? void 0 : _.method))(), F;
  }
  let p = { setError: i, addFieldError: u, loading: t, error: s, api: d, apiVoid: c, apiForm: f, apiFormVoid: m, swr: $, swrEffect: k, unRefs: Zt, setRef: Yn };
  return ms("ApiState", p), p;
}
function lo(e) {
  return e && e.SessionId ? Do(e) : e;
}
function Ta(e) {
  X.user.value = lo(e), X.events.publish("signIn", e);
}
function Ia() {
  X.user.value = null, X.events.publish("signOut", null);
}
const Pl = (e) => (e == null ? void 0 : e.roles) || [], jl = (e) => (e == null ? void 0 : e.permissions) || [];
function no(e) {
  return Pl(X.user.value).indexOf(e) >= 0;
}
function Da(e) {
  return jl(X.user.value).indexOf(e) >= 0;
}
function Bl() {
  return no("Admin");
}
function ds(e) {
  if (!e)
    return !1;
  if (!e.requiresAuth)
    return !0;
  const t = X.user.value;
  if (!t)
    return !1;
  if (Bl())
    return !0;
  let [s, n] = [Pl(t), jl(t)], [a, i, u, d] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ];
  return !(!a.every((c) => s.indexOf(c) >= 0) || u.length > 0 && !u.some((c) => s.indexOf(c) >= 0) || !i.every((c) => n.indexOf(c) >= 0) || d.length > 0 && !d.every((c) => n.indexOf(c) >= 0));
}
function Pa(e) {
  if (!e || !e.requiresAuth)
    return null;
  const t = X.user.value;
  if (!t)
    return `<b>${e.request.name}</b> requires Authentication`;
  if (Bl())
    return null;
  let [s, n] = [Pl(t), jl(t)], [a, i, u, d] = [
    e.requiredRoles || [],
    e.requiredPermissions || [],
    e.requiresAnyRole || [],
    e.requiresAnyPermission || []
  ], c = a.filter((m) => s.indexOf(m) < 0);
  if (c.length > 0)
    return `Requires ${c.map((m) => "<b>" + m + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "");
  let f = i.filter((m) => n.indexOf(m) < 0);
  return f.length > 0 ? `Requires ${f.map((m) => "<b>" + m + "</b>").join(", ")} Permission` + (f.length > 1 ? "s" : "") : u.length > 0 && !u.some((m) => s.indexOf(m) >= 0) ? `Requires any ${u.filter((m) => s.indexOf(m) < 0).map((m) => "<b>" + m + "</b>").join(", ")} Role` + (c.length > 1 ? "s" : "") : d.length > 0 && !d.every((m) => n.indexOf(m) >= 0) ? `Requires any ${d.filter((m) => n.indexOf(m) < 0).map((m) => "<b>" + m + "</b>").join(", ")} Permission` + (f.length > 1 ? "s" : "") : null;
}
function Ol() {
  const e = v(() => X.user.value || null), t = v(() => X.user.value != null);
  return { signIn: Ta, signOut: Ia, user: e, toAuth: lo, isAuthenticated: t, hasRole: no, hasPermission: Da, isAdmin: Bl, canAccess: ds, invalidAccessMessage: Pa };
}
function et(e, t) {
  return Array.isArray(e) ? e.indexOf(t) >= 0 : e == t || e.includes(t);
}
const Is = {
  blue: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200",
  purple: "text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200",
  red: "text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-200",
  green: "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200",
  sky: "text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200",
  cyan: "text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-200",
  indigo: "text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
}, ct = {
  base: "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:shadow-none",
  invalid: "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500",
  valid: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 dark:border-gray-600"
}, rs = {
  panelClass: "shadow sm:rounded-md",
  formClass: "space-y-6 bg-white dark:bg-black py-6 px-4 sm:p-6",
  headingClass: "text-lg font-medium leading-6 text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400"
}, Gt = {
  panelClass: "pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg",
  formClass: "flex h-full flex-col divide-y divide-gray-200 dark:divide-gray-700 shadow-xl bg-white dark:bg-black",
  titlebarClass: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6",
  headingClass: "text-lg font-medium text-gray-900 dark:text-gray-100",
  subHeadingClass: "mt-1 text-sm text-gray-500 dark:text-gray-400",
  closeButtonClass: "rounded-md bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
}, fl = {
  modalClass: "relative transform overflow-hidden rounded-lg bg-white dark:bg-black text-left shadow-xl transition-all sm:my-8",
  sizeClass: "sm:max-w-prose lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl sm:w-full"
}, Ee = {
  panelClass(e = "slideOver") {
    return e == "card" ? rs.panelClass : Gt.panelClass;
  },
  formClass(e = "slideOver") {
    return e == "card" ? rs.formClass : Gt.formClass;
  },
  headingClass(e = "slideOver") {
    return e == "card" ? rs.headingClass : Gt.headingClass;
  },
  subHeadingClass(e = "slideOver") {
    return e == "card" ? rs.subHeadingClass : Gt.subHeadingClass;
  },
  buttonsClass: "px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between",
  legendClass: "text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4"
}, he = {
  getGridClass(e = "stripedRows") {
    return he.gridClass;
  },
  getGrid2Class(e = "stripedRows") {
    return et(e, "fullWidth") ? "overflow-x-auto" : he.grid2Class;
  },
  getGrid3Class(e = "stripedRows") {
    return et(e, "fullWidth") ? "inline-block min-w-full py-2 align-middle" : he.grid3Class;
  },
  getGrid4Class(e = "stripedRows") {
    return et(e, "whiteBackground") ? "" : et(e, "fullWidth") ? "overflow-hidden shadow-sm ring-1 ring-black/5" : he.grid4Class;
  },
  getTableClass(e = "stripedRows") {
    return et(e, "fullWidth") || et(e, "verticalLines") ? "min-w-full divide-y divide-gray-300" : he.tableClass;
  },
  getTheadClass(e = "stripedRows") {
    return et(e, "whiteBackground") ? "" : he.theadClass;
  },
  getTheadRowClass(e = "stripedRows") {
    return he.theadRowClass + (et(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
  },
  getTheadCellClass(e = "stripedRows") {
    return he.theadCellClass + (et(e, "uppercaseHeadings") ? " uppercase" : "");
  },
  getTbodyClass(e = "stripedRows") {
    return (et(e, "whiteBackground") || et(e, "verticalLines") ? "divide-y divide-gray-200 dark:divide-gray-800" : he.tableClass) + (et(e, "verticalLines") ? " bg-white" : "");
  },
  getTableRowClass(e = "stripedRows", t, s, n) {
    return (n ? "cursor-pointer " : "") + (s ? "bg-indigo-100 dark:bg-blue-800" : (n ? "hover:bg-yellow-50 dark:hover:bg-blue-900 " : "") + (et(e, "stripedRows") ? t % 2 == 0 ? "bg-white dark:bg-black" : "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-black")) + (et(e, "verticalLines") ? " divide-x divide-gray-200 dark:divide-gray-700" : "");
  },
  gridClass: "flex flex-col",
  //original -margins + padding forces scroll bars when parent is w-full for no clear benefits?
  //original: -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8
  grid2Class: "",
  //original: inline-block min-w-full py-2 align-middle md:px-6 lg:px-8
  grid3Class: "inline-block min-w-full py-2 align-middle",
  grid4Class: "overflow-hidden shadow ring-1 ring-black/5 md:rounded-lg",
  tableClass: "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
  theadClass: "bg-gray-50 dark:bg-gray-900",
  tableCellClass: "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
  theadRowClass: "select-none",
  theadCellClass: "px-6 py-4 text-left text-sm font-medium tracking-wider whitespace-nowrap",
  toolbarButtonClass: "inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"
}, ja = {
  colspans: "col-span-3 sm:col-span-3"
}, bg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  a: Is,
  card: rs,
  dummy: ja,
  form: Ee,
  grid: he,
  input: ct,
  modal: fl,
  slideOver: Gt
}, Symbol.toStringTag, { value: "Module" })), Ba = { class: "flex items-center" }, Oa = {
  key: 0,
  class: "flex-shrink-0 mr-3"
}, Ha = {
  key: 0,
  class: "h-5 w-5 text-yellow-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Ra = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
  "clip-rule": "evenodd"
}, null, -1), Ea = [
  Ra
], Na = {
  key: 1,
  class: "h-5 w-5 text-red-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, za = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z",
  "clip-rule": "evenodd"
}, null, -1), Ua = [
  za
], qa = {
  key: 2,
  class: "h-5 w-5 text-blue-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Qa = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0zM8.25 9.75A.75.75 0 019 9h.253a1.75 1.75 0 011.709 2.13l-.46 2.066a.25.25 0 00.245.304H11a.75.75 0 010 1.5h-.253a1.75 1.75 0 01-1.709-2.13l.46-2.066a.25.25 0 00-.245-.304H9a.75.75 0 01-.75-.75zM10 7a1 1 0 100-2 1 1 0 000 2z",
  "clip-rule": "evenodd"
}, null, -1), Ka = [
  Qa
], Za = {
  key: 3,
  class: "h-5 w-5 text-green-400",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, Wa = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
  "clip-rule": "evenodd"
}, null, -1), Ga = [
  Wa
], Ja = /* @__PURE__ */ ue({
  __name: "Alert",
  props: {
    type: { default: "warn" },
    hideIcon: { type: Boolean }
  },
  setup(e) {
    const t = e, s = v(() => t.type == "info" ? "bg-blue-50 dark:bg-blue-200" : t.type == "error" ? "bg-red-50 dark:bg-red-200" : t.type == "success" ? "bg-green-50 dark:bg-green-200" : "bg-yellow-50 dark:bg-yellow-200"), n = v(() => t.type == "info" ? "border-blue-400" : t.type == "error" ? "border-red-400" : t.type == "success" ? "border-green-400" : "border-yellow-400"), a = v(() => t.type == "info" ? "text-blue-700" : t.type == "error" ? "text-red-700" : t.type == "success" ? "text-green-700" : "text-yellow-700");
    return (i, u) => (o(), r("div", {
      class: g([s.value, n.value, "border-l-4 p-4"])
    }, [
      l("div", Ba, [
        i.hideIcon ? L("", !0) : (o(), r("div", Oa, [
          i.type == "warn" ? (o(), r("svg", Ha, Ea)) : i.type == "error" ? (o(), r("svg", Na, Ua)) : i.type == "info" ? (o(), r("svg", qa, Ka)) : i.type == "success" ? (o(), r("svg", Za, Ga)) : L("", !0)
        ])),
        l("div", null, [
          l("p", {
            class: g([a.value, "text-sm"])
          }, [
            z(i.$slots, "default")
          ], 2)
        ])
      ])
    ], 2));
  }
}), Xa = {
  key: 0,
  class: "rounded-md bg-green-50 dark:bg-green-200 p-4",
  role: "alert"
}, Ya = { class: "flex" }, er = /* @__PURE__ */ l("div", { class: "flex-shrink-0" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-green-400 dark:text-green-500",
    fill: "none",
    stroke: "currentColor",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 13l4 4L19 7"
    })
  ])
], -1), tr = { class: "ml-3" }, sr = { class: "text-sm font-medium text-green-800" }, lr = { key: 0 }, nr = { class: "ml-auto pl-3" }, or = { class: "-mx-1.5 -my-1.5" }, ar = /* @__PURE__ */ l("span", { class: "sr-only" }, "Dismiss", -1), rr = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" })
], -1), ir = [
  ar,
  rr
], ur = /* @__PURE__ */ ue({
  __name: "AlertSuccess",
  props: {
    message: {}
  },
  setup(e) {
    const t = I(!1);
    return (s, n) => t.value ? L("", !0) : (o(), r("div", Xa, [
      l("div", Ya, [
        er,
        l("div", tr, [
          l("h3", sr, [
            s.message ? (o(), r("span", lr, T(s.message), 1)) : z(s.$slots, "default", { key: 1 })
          ])
        ]),
        l("div", nr, [
          l("div", or, [
            l("button", {
              type: "button",
              class: "inline-flex rounded-md bg-green-50 dark:bg-green-200 p-1.5 text-green-500 dark:text-green-600 hover:bg-green-100 dark:hover:bg-green-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-green-50 dark:ring-offset-green-900",
              onClick: n[0] || (n[0] = (a) => t.value = !0)
            }, ir)
          ])
        ])
      ])
    ]));
  }
}), dr = { class: "flex" }, cr = /* @__PURE__ */ l("div", { class: "flex-shrink-0" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-red-400",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, [
    /* @__PURE__ */ l("path", {
      fill: "currentColor",
      d: "M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"
    })
  ])
], -1), fr = { class: "ml-3" }, vr = { class: "text-sm text-red-700 dark:text-red-200" }, pr = /* @__PURE__ */ ue({
  __name: "ErrorSummary",
  props: {
    status: {},
    except: {},
    class: {}
  },
  setup(e) {
    const t = e;
    let s = Je("ApiState", void 0);
    const n = v(() => t.status || s != null && s.error.value ? Po.call({ responseStatus: t.status ?? (s == null ? void 0 : s.error.value) }, t.except ?? []) : null);
    return (a, i) => n.value ? (o(), r("div", {
      key: 0,
      class: g(`bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 ${a.$props.class}`)
    }, [
      l("div", dr, [
        cr,
        l("div", fr, [
          l("p", vr, T(n.value), 1)
        ])
      ])
    ], 2)) : L("", !0);
  }
}), mr = ["id", "aria-describedby"], hr = /* @__PURE__ */ ue({
  __name: "InputDescription",
  props: {
    id: {},
    description: {}
  },
  setup(e) {
    return (t, s) => t.description ? (o(), r("div", {
      key: "description",
      class: "mt-2 text-sm text-gray-500",
      id: `${t.id}-description`,
      "aria-describedby": `${t.id}-description`
    }, [
      l("div", null, T(t.description), 1)
    ], 8, mr)) : L("", !0);
  }
}), oo = ue({
  inheritAttrs: !1,
  setup(e, { attrs: t }) {
    return () => {
      let s = e.image;
      if (e.type) {
        const { typeOf: i } = ut(), u = i(e.type);
        u || console.warn(`Type ${e.type} does not exist`), u != null && u.icon ? s = u == null ? void 0 : u.icon : console.warn(`Type ${e.type} does not have a [Svg] icon`);
      }
      let n = e.svg || (s == null ? void 0 : s.svg) || "";
      if (n.startsWith("<svg ")) {
        let u = js(n, ">").indexOf("class="), d = `${(s == null ? void 0 : s.cls) || ""} ${t.class || ""}`;
        if (u == -1)
          n = `<svg class="${d}" ${n.substring(4)}`;
        else {
          const c = u + 6 + 1;
          n = `${n.substring(0, c) + d} ${n.substring(c)}`;
        }
        return Ft("span", { innerHTML: n });
      } else
        return Ft("img", {
          class: [s == null ? void 0 : s.cls, t.class],
          src: Tl(e.src || (s == null ? void 0 : s.uri)),
          onError: (i) => Os(i.target)
        });
    };
  }
}), gr = { class: "text-2xl font-semibold text-gray-900 dark:text-gray-300" }, yr = { class: "flex" }, br = /* @__PURE__ */ l("path", {
  d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
  fill: "currentColor"
}, null, -1), wr = /* @__PURE__ */ l("path", {
  d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
  fill: "currentFill"
}, null, -1), kr = [
  br,
  wr
], _r = /* @__PURE__ */ ue({
  __name: "Loading",
  props: {
    imageClass: { default: "w-6 h-6" }
  },
  setup(e) {
    return (t, s) => (o(), r("div", gr, [
      l("div", yr, [
        (o(), r("svg", {
          class: g(["self-center inline mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300", t.imageClass]),
          role: "status",
          viewBox: "0 0 100 101",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, kr, 2)),
        l("span", null, [
          z(t.$slots, "default")
        ])
      ])
    ]));
  }
}), $r = ["href", "onClick"], Cr = ["type"], on = "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 disabled:text-gray-400 bg-white dark:bg-black hover:bg-gray-50 hover:dark:bg-gray-900 disabled:hover:bg-white dark:disabled:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black", xr = /* @__PURE__ */ ue({
  __name: "OutlineButton",
  props: {
    type: { default: "submit" },
    href: {}
  },
  setup(e) {
    return (t, s) => {
      const n = Q("router-link");
      return t.href ? (o(), ne(n, {
        key: 0,
        to: t.href
      }, {
        default: $e(({ navigate: a }) => [
          l("button", {
            class: g(on),
            href: t.href,
            onClick: a
          }, [
            z(t.$slots, "default")
          ], 8, $r)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Se({
        key: 1,
        type: t.type,
        class: on
      }, t.$attrs), [
        z(t.$slots, "default")
      ], 16, Cr));
    };
  }
}), Lr = ["href", "onClick"], Vr = ["type"], Mr = /* @__PURE__ */ ue({
  __name: "PrimaryButton",
  props: {
    type: { default: "submit" },
    href: {},
    color: { default: "indigo" }
  },
  setup(e) {
    const t = e, s = {
      blue: "focus:ring-indigo-500 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      purple: "focus:ring-indigo-500 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      red: "focus:ring-red-500 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:hover:bg-red-400 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-500",
      green: "focus:ring-green-500 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:hover:bg-green-400 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-500",
      sky: "focus:ring-sky-500 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 disabled:hover:bg-sky-400 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-500",
      cyan: "focus:ring-cyan-500 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 disabled:hover:bg-cyan-400 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-500",
      indigo: "focus:ring-indigo-500 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:hover:bg-indigo-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    }, n = v(() => "inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black text-white " + (s[t.color] || s.indigo));
    return (a, i) => {
      const u = Q("router-link");
      return a.href ? (o(), ne(u, {
        key: 0,
        to: a.href
      }, {
        default: $e(({ navigate: d }) => [
          l("button", {
            class: g(n.value),
            href: a.href,
            onClick: d
          }, [
            z(a.$slots, "default")
          ], 10, Lr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Se({
        key: 1,
        type: a.type,
        class: n.value
      }, a.$attrs), [
        z(a.$slots, "default")
      ], 16, Vr));
    };
  }
}), Sr = ["type", "href", "onClick"], Ar = ["type"], an = "inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-black", Fr = /* @__PURE__ */ ue({
  __name: "SecondaryButton",
  props: {
    type: {},
    href: {}
  },
  setup(e) {
    return (t, s) => {
      const n = Q("router-link");
      return t.href ? (o(), ne(n, {
        key: 0,
        to: t.href
      }, {
        default: $e(({ navigate: a }) => [
          l("button", {
            type: t.type ?? "button",
            class: g(an),
            href: t.href,
            onClick: a
          }, [
            z(t.$slots, "default")
          ], 8, Sr)
        ]),
        _: 3
      }, 8, ["to"])) : (o(), r("button", Se({
        key: 1,
        type: t.type ?? "button",
        class: an
      }, t.$attrs), [
        z(t.$slots, "default")
      ], 16, Ar));
    };
  }
}), Tr = /* @__PURE__ */ ue({
  __name: "TextLink",
  props: {
    color: { default: "blue" }
  },
  setup(e) {
    const t = yo(), s = e, n = v(() => (Is[s.color] || Is.blue) + (t.href ? "" : " cursor-pointer"));
    return (a, i) => (o(), r("a", {
      class: g(n.value)
    }, [
      z(a.$slots, "default")
    ], 2));
  }
}), Ir = {
  class: "flex",
  "aria-label": "Breadcrumb"
}, Dr = {
  role: "list",
  class: "flex items-center space-x-4"
}, Pr = ["href", "title"], jr = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6 flex-shrink-0",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z",
    "clip-rule": "evenodd"
  })
], -1), Br = { class: "sr-only" }, Or = /* @__PURE__ */ ue({
  __name: "Breadcrumbs",
  props: {
    homeHref: { default: "/" },
    homeLabel: { default: "Home" }
  },
  setup(e) {
    return (t, s) => (o(), r("nav", Ir, [
      l("ol", Dr, [
        l("li", null, [
          l("div", null, [
            l("a", {
              href: t.homeHref,
              class: "text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400",
              title: t.homeLabel
            }, [
              jr,
              l("span", Br, T(t.homeLabel), 1)
            ], 8, Pr)
          ])
        ]),
        z(t.$slots, "default")
      ])
    ]));
  }
}), Hr = { class: "flex items-center" }, Rr = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6 flex-shrink-0 text-gray-400 dark:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
    "clip-rule": "evenodd"
  })
], -1), Er = ["href", "title"], Nr = ["title"], zr = /* @__PURE__ */ ue({
  __name: "Breadcrumb",
  props: {
    href: {},
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), r("li", null, [
      l("div", Hr, [
        Rr,
        t.href ? (o(), r("a", {
          key: 0,
          href: t.href,
          class: "ml-4 text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
          title: t.title
        }, [
          z(t.$slots, "default")
        ], 8, Er)) : (o(), r("span", {
          key: 1,
          class: "ml-4 text-lg font-medium text-gray-700 dark:text-gray-300",
          title: t.title
        }, [
          z(t.$slots, "default")
        ], 8, Nr))
      ])
    ]));
  }
}), Ur = {
  key: 0,
  class: "text-base font-semibold text-gray-500 dark:text-gray-400"
}, qr = {
  role: "list",
  class: "mt-4 divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800"
}, Qr = /* @__PURE__ */ ue({
  __name: "NavList",
  props: {
    title: {}
  },
  setup(e) {
    return (t, s) => (o(), r("div", null, [
      t.title ? (o(), r("h2", Ur, T(t.title), 1)) : L("", !0),
      l("ul", qr, [
        z(t.$slots, "default")
      ])
    ]));
  }
}), Kr = { class: "relative flex items-start space-x-4 py-6" }, Zr = { class: "flex-shrink-0" }, Wr = { class: "flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900" }, Gr = { class: "min-w-0 flex-1" }, Jr = { class: "text-base font-medium text-gray-900 dark:text-gray-100" }, Xr = { class: "rounded-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2" }, Yr = ["href"], ei = /* @__PURE__ */ l("span", {
  class: "absolute inset-0",
  "aria-hidden": "true"
}, null, -1), ti = { class: "text-base text-gray-500" }, si = /* @__PURE__ */ l("div", { class: "flex-shrink-0 self-center" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-gray-400",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ l("path", {
      "fill-rule": "evenodd",
      d: "M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z",
      "clip-rule": "evenodd"
    })
  ])
], -1), li = /* @__PURE__ */ ue({
  __name: "NavListItem",
  props: {
    title: {},
    href: {},
    icon: {},
    iconSvg: {},
    iconSrc: {},
    iconAlt: {}
  },
  setup(e) {
    return (t, s) => {
      const n = Q("Icon");
      return o(), r("li", Kr, [
        l("div", Zr, [
          l("span", Wr, [
            we(n, {
              class: "w-6 h-6 text-indigo-700 dark:text-indigo-300",
              image: t.icon,
              src: t.iconSrc,
              svg: t.iconSvg,
              alt: t.iconAlt
            }, null, 8, ["image", "src", "svg", "alt"])
          ])
        ]),
        l("div", Gr, [
          l("h3", Jr, [
            l("span", Xr, [
              l("a", {
                href: t.href,
                class: "focus:outline-none"
              }, [
                ei,
                _e(" " + T(t.title), 1)
              ], 8, Yr)
            ])
          ]),
          l("p", ti, [
            z(t.$slots, "default")
          ])
        ]),
        si
      ]);
    };
  }
}), ni = { key: 0 }, oi = { class: "md:p-4" }, ao = /* @__PURE__ */ ue({
  __name: "EnsureAccess",
  props: {
    invalidAccess: {},
    alertClass: {}
  },
  emits: ["done"],
  setup(e) {
    const { isAuthenticated: t } = Ol(), { config: s } = Nt(), n = () => {
      let i = location.href.substring(location.origin.length) || "/";
      const u = Yt(s.value.redirectSignIn, { redirect: i });
      s.value.navigate(u);
    }, a = () => {
      let i = location.href.substring(location.origin.length) || "/";
      const u = Yt(s.value.redirectSignOut, { ReturnUrl: i });
      s.value.navigate(u);
    };
    return (i, u) => {
      const d = Q("Alert"), c = Q("SecondaryButton");
      return i.invalidAccess ? (o(), r("div", ni, [
        we(d, {
          class: g(i.alertClass),
          innerHTML: i.invalidAccess
        }, null, 8, ["class", "innerHTML"]),
        l("div", oi, [
          J(t) ? (o(), ne(c, {
            key: 1,
            onClick: a
          }, {
            default: $e(() => [
              _e("Sign Out")
            ]),
            _: 1
          })) : (o(), ne(c, {
            key: 0,
            onClick: n
          }, {
            default: $e(() => [
              _e("Sign In")
            ]),
            _: 1
          }))
        ])
      ])) : L("", !0);
    };
  }
}), ai = { class: "absolute top-0 right-0 bg-white dark:bg-black border dark:border-gray-800 rounded normal-case text-sm shadow w-80" }, ri = { class: "p-4" }, ii = /* @__PURE__ */ l("h3", { class: "text-base font-medium mb-3 dark:text-gray-100" }, "Sort", -1), ui = { class: "flex w-full justify-center" }, di = /* @__PURE__ */ l("svg", {
  class: "w-6 h-6",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16"
}, [
  /* @__PURE__ */ l("g", { fill: "currentColor" }, [
    /* @__PURE__ */ l("path", {
      "fill-rule": "evenodd",
      d: "M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"
    }),
    /* @__PURE__ */ l("path", { d: "M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999l.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" })
  ])
], -1), ci = /* @__PURE__ */ l("span", null, "ASC", -1), fi = [
  di,
  ci
], vi = /* @__PURE__ */ Ds('<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="currentColor"><path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"></path><path fill-rule="evenodd" d="M10.082 12.629L9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"></path><path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999l.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"></path></g></svg><span>DESC</span>', 2), pi = [
  vi
], mi = /* @__PURE__ */ l("h3", { class: "text-base font-medium mt-4 mb-2" }, " Filter ", -1), hi = { key: 0 }, gi = ["id", "value"], yi = ["for"], bi = { key: 1 }, wi = { class: "mb-2" }, ki = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, _i = ["onClick"], $i = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), Ci = [
  $i
], xi = { class: "flex" }, Li = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
    "clip-rule": "evenodd"
  })
], -1), Vi = [
  Li
], Mi = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, Hl = /* @__PURE__ */ ue({
  __name: "FilterColumn",
  props: {
    definitions: {},
    column: {},
    topLeft: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = I(), i = I(""), u = I(""), d = I([]), c = v(() => s.column.meta.isEnum == !0), f = v(() => vt(s.column.meta.type === "Nullable`1" ? s.column.meta.genericArgs[0] : s.column.meta.type)), m = v(() => s.column.meta.isEnum == !0 ? Vl(Mn(f.value.name)) : []), $ = v(() => {
      var w;
      return ((w = y(s.column.type)) == null ? void 0 : w.map((j) => ({ key: j.value, value: j.name }))) || [];
    }), k = I({ filters: [] }), p = v(() => k.value.filters);
    Ss(() => k.value = Object.assign({}, s.column.settings, {
      filters: Array.from(s.column.settings.filters)
    })), Ss(() => {
      var j, U, oe, A, K;
      let w = ((oe = (U = (j = s.column.settings.filters) == null ? void 0 : j[0]) == null ? void 0 : U.value) == null ? void 0 : oe.split(",")) || [];
      if (w.length > 0 && ((A = f.value) != null && A.isEnumInt)) {
        const W = parseInt(w[0]);
        w = ((K = f.value.enumValues) == null ? void 0 : K.filter((q) => (W & parseInt(q)) > 0)) || [];
      }
      d.value = w;
    });
    function y(w) {
      let j = s.definitions;
      return Cn(w) || (j = j.filter((U) => U.types !== "string")), j;
    }
    function _(w, j) {
      return y(w).find((U) => U.value === j);
    }
    function F() {
      var j;
      if (!i.value)
        return;
      let w = (j = _(s.column.type, i.value)) == null ? void 0 : j.name;
      w && (k.value.filters.push({ key: i.value, name: w, value: u.value }), i.value = u.value = "");
    }
    function H(w) {
      k.value.filters.splice(w, 1);
    }
    function ae(w) {
      return In(_(s.column.type, w.key), s.column.type, w);
    }
    function N() {
      n("done");
    }
    function R() {
      var w;
      i.value = "%", (w = a.value) == null || w.focus();
    }
    function M() {
      var w;
      if (u.value && F(), c.value) {
        let j = Object.values(d.value).filter((U) => U);
        k.value.filters = j.length > 0 ? (w = f.value) != null && w.isEnumInt ? [{ key: "%HasAny", name: "HasAny", value: j.map((U) => parseInt(U)).reduce((U, oe) => U + oe, 0).toString() }] : [{ key: "%In", name: "In", value: j.join(",") }] : [];
      }
      n("save", k.value), n("done");
    }
    function le(w) {
      k.value.sort = w === k.value.sort ? void 0 : w, jt(M);
    }
    return (w, j) => {
      var W;
      const U = Q("SelectInput"), oe = Q("TextInput"), A = Q("PrimaryButton"), K = Q("SecondaryButton");
      return o(), r("div", {
        class: "fixed z-20 inset-0 overflow-y-auto",
        onClick: N,
        onVnodeMounted: R
      }, [
        l("div", {
          class: "absolute",
          style: vl(`top:${w.topLeft.y}px;left:${w.topLeft.x}px`),
          onClick: j[5] || (j[5] = Ue(() => {
          }, ["stop"]))
        }, [
          l("div", ai, [
            l("div", ri, [
              ii,
              l("div", ui, [
                l("button", {
                  type: "button",
                  title: "Sort Ascending",
                  onClick: j[0] || (j[0] = (q) => le("ASC")),
                  class: g(`${k.value.sort === "ASC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} mr-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, fi, 2),
                l("button", {
                  type: "button",
                  title: "Sort Descending",
                  onClick: j[1] || (j[1] = (q) => le("DESC")),
                  class: g(`${k.value.sort === "DESC" ? "bg-indigo-100 border-indigo-500" : "bg-white hover:bg-gray-50 border-gray-300"} ml-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`)
                }, pi, 2)
              ]),
              mi,
              c.value ? (o(), r("div", hi, [
                (o(!0), r(Me, null, Ie(m.value, (q) => (o(), r("div", {
                  key: q.key,
                  class: "flex items-center"
                }, [
                  Bt(l("input", {
                    type: "checkbox",
                    id: q.key,
                    value: q.key,
                    "onUpdate:modelValue": j[2] || (j[2] = (S) => d.value = S),
                    class: "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  }, null, 8, gi), [
                    [pl, d.value]
                  ]),
                  l("label", {
                    for: q.key,
                    class: "ml-3"
                  }, T(q.value), 9, yi)
                ]))), 128))
              ])) : (o(), r("div", bi, [
                (o(!0), r(Me, null, Ie(p.value, (q, S) => (o(), r("div", wi, [
                  l("span", ki, [
                    _e(T(w.column.name) + " " + T(q.name) + " " + T(ae(q)) + " ", 1),
                    l("button", {
                      type: "button",
                      onClick: (se) => H(S),
                      class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                    }, Ci, 8, _i)
                  ])
                ]))), 256)),
                l("div", xi, [
                  we(U, {
                    id: "filterRule",
                    class: "w-32 mr-1",
                    modelValue: i.value,
                    "onUpdate:modelValue": j[3] || (j[3] = (q) => i.value = q),
                    entries: $.value,
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue", "entries"]),
                  ((W = _(w.column.type, i.value)) == null ? void 0 : W.valueType) !== "none" ? (o(), ne(oe, {
                    key: 0,
                    ref_key: "txtFilter",
                    ref: a,
                    id: "filterValue",
                    class: "w-32 mr-1",
                    type: "text",
                    modelValue: u.value,
                    "onUpdate:modelValue": j[4] || (j[4] = (q) => u.value = q),
                    onKeyup: dn(F, ["enter"]),
                    label: "",
                    placeholder: ""
                  }, null, 8, ["modelValue"])) : L("", !0),
                  l("div", { class: "pt-1" }, [
                    l("button", {
                      type: "button",
                      onClick: F,
                      class: "inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    }, Vi)
                  ])
                ])
              ]))
            ]),
            l("div", Mi, [
              we(A, {
                onClick: M,
                color: "red",
                class: "ml-2"
              }, {
                default: $e(() => [
                  _e(" Save ")
                ]),
                _: 1
              }),
              we(K, { onClick: N }, {
                default: $e(() => [
                  _e(" Cancel ")
                ]),
                _: 1
              })
            ])
          ])
        ], 4)
      ], 512);
    };
  }
}), Si = { class: "px-4 sm:px-6 lg:px-8 text-sm" }, Ai = { class: "flex flex-wrap" }, Fi = { class: "group pr-4 sm:pr-6 lg:pr-8" }, Ti = { class: "flex justify-between w-full font-medium" }, Ii = { class: "w-6 flex justify-end" }, Di = { class: "hidden group-hover:inline" }, Pi = ["onClick", "title"], ji = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), Bi = [
  ji
], Oi = {
  key: 0,
  class: "pt-2"
}, Hi = { class: "ml-2" }, Ri = { key: 1 }, Ei = { class: "pt-2" }, Ni = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700" }, zi = ["onClick"], Ui = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), qi = [
  Ui
], Qi = /* @__PURE__ */ l("span", null, "Clear All", -1), Ki = [
  Qi
], Rl = /* @__PURE__ */ ue({
  __name: "FilterViews",
  props: {
    definitions: {},
    columns: {}
  },
  emits: ["done", "change"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = v(() => s.columns.filter((k) => k.settings.filters.length > 0));
    function i(k) {
      var p, y;
      return (y = (p = k == null ? void 0 : k[0]) == null ? void 0 : p.value) == null ? void 0 : y.split(",");
    }
    function u(k) {
      let p = s.definitions;
      return Cn(k) || (p = p.filter((y) => y.types !== "string")), p;
    }
    function d(k, p) {
      return u(k).find((y) => y.value === p);
    }
    function c(k, p) {
      return In(d(k.type, p.value), k.type, p);
    }
    function f(k) {
      k.settings.filters = [], n("change", k);
    }
    function m(k, p) {
      k.settings.filters.splice(p, 1), n("change", k);
    }
    function $() {
      s.columns.forEach((k) => {
        k.settings.filters = [], n("change", k);
      }), n("done");
    }
    return (k, p) => (o(), r("div", Si, [
      l("div", Ai, [
        (o(!0), r(Me, null, Ie(a.value, (y) => (o(), r("fieldset", Fi, [
          l("legend", Ti, [
            l("span", null, T(J(Re)(y.name)), 1),
            l("span", Ii, [
              l("span", Di, [
                l("button", {
                  onClick: (_) => f(y),
                  title: `Clear all ${J(Re)(y.name)} filters`,
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
                }, Bi, 8, Pi)
              ])
            ])
          ]),
          y.meta.isEnum ? (o(), r("div", Oi, [
            (o(!0), r(Me, null, Ie(i(y.settings.filters), (_) => (o(), r("div", {
              key: _,
              class: "flex items-center"
            }, [
              l("label", Hi, T(_), 1)
            ]))), 128))
          ])) : (o(), r("div", Ri, [
            (o(!0), r(Me, null, Ie(y.settings.filters, (_, F) => (o(), r("div", Ei, [
              l("span", Ni, [
                _e(T(y.name) + " " + T(_.name) + " " + T(c(y, _)) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (H) => m(y, F),
                  class: "flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                }, qi, 8, zi)
              ])
            ]))), 256))
          ]))
        ]))), 256))
      ]),
      l("div", { class: "flex justify-center pt-4" }, [
        l("button", {
          type: "button",
          onClick: $,
          class: "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        }, Ki)
      ])
    ]));
  }
}), Zi = { class: "bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4" }, Wi = { class: "" }, Gi = { class: "mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left" }, Ji = /* @__PURE__ */ l("h3", { class: "text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" }, "Query Preferences", -1), Xi = { class: "mt-4" }, Yi = ["for"], eu = ["id"], tu = ["value", "selected"], su = { class: "mt-4 flex items-center py-4 border-b border-gray-200 dark:border-gray-800" }, lu = ["id", "checked"], nu = ["for"], ou = { class: "mt-4" }, au = { class: "pb-2 px-4" }, ru = { class: "" }, iu = ["id", "value"], uu = ["for"], du = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" }, El = /* @__PURE__ */ ue({
  __name: "QueryPrefs",
  props: {
    id: { default: "QueryPrefs" },
    columns: {},
    prefs: {},
    maxLimit: {}
  },
  emits: ["done", "save"],
  setup(e, { emit: t }) {
    const { autoQueryGridDefaults: s } = Nt(), n = e, a = t, i = I({});
    Ss(() => i.value = Object.assign({
      take: s.value.take,
      selectedColumns: []
    }, n.prefs));
    const u = [10, 25, 50, 100, 250, 500, 1e3];
    function d() {
      a("done");
    }
    function c() {
      a("save", i.value);
    }
    return (f, m) => {
      const $ = Q("PrimaryButton"), k = Q("SecondaryButton"), p = Q("ModalDialog");
      return o(), ne(p, {
        id: f.id,
        onDone: d,
        "size-class": "w-full sm:max-w-prose"
      }, {
        default: $e(() => [
          l("div", Zi, [
            l("div", Wi, [
              l("div", Gi, [
                Ji,
                l("div", Xi, [
                  l("label", {
                    for: `${f.id}-take`,
                    class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
                  }, "Results per page", 8, Yi),
                  Bt(l("select", {
                    id: `${f.id}-take`,
                    "onUpdate:modelValue": m[0] || (m[0] = (y) => i.value.take = y),
                    class: "mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  }, [
                    (o(!0), r(Me, null, Ie(u.filter((y) => n.maxLimit == null || y <= n.maxLimit), (y) => (o(), r("option", {
                      value: y,
                      selected: y === i.value.take
                    }, T(y), 9, tu))), 256))
                  ], 8, eu), [
                    [bo, i.value.take]
                  ])
                ]),
                l("div", su, [
                  l("input", {
                    type: "radio",
                    id: `${f.id}-allColumns`,
                    onClick: m[1] || (m[1] = (y) => i.value.selectedColumns = []),
                    checked: i.value.selectedColumns.length === 0,
                    class: "focus:ring-indigo-500 h-4 w-4 bg-white dark:bg-black text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-700"
                  }, null, 8, lu),
                  l("label", {
                    class: "ml-3 block text-gray-700 dark:text-gray-300",
                    for: `${f.id}-allColumns`
                  }, "View all columns", 8, nu)
                ]),
                l("div", ou, [
                  l("div", au, [
                    l("div", ru, [
                      (o(!0), r(Me, null, Ie(f.columns, (y) => (o(), r("div", {
                        key: y.name,
                        class: "flex items-center"
                      }, [
                        Bt(l("input", {
                          type: "checkbox",
                          id: y.name,
                          value: y.name,
                          "onUpdate:modelValue": m[2] || (m[2] = (_) => i.value.selectedColumns = _),
                          class: "h-4 w-4 bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500"
                        }, null, 8, iu), [
                          [pl, i.value.selectedColumns]
                        ]),
                        l("label", {
                          for: y.name,
                          class: "ml-3"
                        }, T(y.name), 9, uu)
                      ]))), 128))
                    ])
                  ])
                ])
              ])
            ])
          ]),
          l("div", du, [
            we($, {
              onClick: c,
              color: "red",
              class: "ml-2"
            }, {
              default: $e(() => [
                _e(" Save ")
              ]),
              _: 1
            }),
            we(k, { onClick: d }, {
              default: $e(() => [
                _e(" Cancel ")
              ]),
              _: 1
            })
          ])
        ]),
        _: 1
      }, 8, ["id"]);
    };
  }
}), cu = { key: 0 }, fu = { key: 1 }, vu = {
  key: 2,
  class: "pt-1"
}, pu = { key: 0 }, mu = { key: 1 }, hu = { key: 2 }, gu = { key: 4 }, yu = { class: "pl-1 pt-1 flex flex-wrap" }, bu = { class: "flex mt-1" }, wu = ["title"], ku = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("g", {
    "stroke-width": "1.5",
    fill: "none"
  }, [
    /* @__PURE__ */ l("path", {
      d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18",
      stroke: "currentColor"
    })
  ])
], -1), _u = [
  ku
], $u = ["disabled"], Cu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
    fill: "currentColor"
  })
], -1), xu = [
  Cu
], Lu = ["disabled"], Vu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z",
    fill: "currentColor"
  })
], -1), Mu = [
  Vu
], Su = ["disabled"], Au = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z",
    fill: "currentColor"
  })
], -1), Fu = [
  Au
], Tu = ["disabled"], Iu = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z",
    fill: "currentColor"
  })
], -1), Du = [
  Iu
], Pu = {
  key: 0,
  class: "flex mt-1"
}, ju = { class: "px-4 text-lg text-black dark:text-white" }, Bu = { key: 0 }, Ou = { key: 1 }, Hu = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), Ru = { key: 2 }, Eu = { class: "flex flex-wrap" }, Nu = {
  key: 0,
  class: "pl-2 mt-1"
}, zu = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "none",
    stroke: "currentColor",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M20 20v-5h-5M4 4v5h5m10.938 2A8.001 8.001 0 0 0 5.07 8m-1.008 5a8.001 8.001  0 0 0 14.868 3"
  })
], -1), Uu = [
  zu
], qu = {
  key: 1,
  class: "pl-2 mt-1"
}, Qu = /* @__PURE__ */ Ds('<svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M28.781 4.405h-10.13V2.018L2 4.588v22.527l16.651 2.868v-3.538h10.13A1.162 1.162 0 0 0 30 25.349V5.5a1.162 1.162 0 0 0-1.219-1.095zm.16 21.126H18.617l-.017-1.889h2.487v-2.2h-2.506l-.012-1.3h2.518v-2.2H18.55l-.012-1.3h2.549v-2.2H18.53v-1.3h2.557v-2.2H18.53v-1.3h2.557v-2.2H18.53v-2h10.411z" fill="#20744a" fill-rule="evenodd"></path><path fill="#20744a" d="M22.487 7.439h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 10.94h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 14.441h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 17.942h4.323v2.2h-4.323z"></path><path fill="#20744a" d="M22.487 21.443h4.323v2.2h-4.323z"></path><path fill="#fff" fill-rule="evenodd" d="M6.347 10.673l2.146-.123l1.349 3.709l1.594-3.862l2.146-.123l-2.606 5.266l2.606 5.279l-2.269-.153l-1.532-4.024l-1.533 3.871l-2.085-.184l2.422-4.663l-2.238-4.993z"></path></svg><span class="text-green-900 dark:text-green-100">Excel</span>', 2), Ku = [
  Qu
], Zu = {
  key: 2,
  class: "pl-2 mt-1"
}, Wu = {
  key: 0,
  class: "w-5 h-5 mr-1 text-green-600 dark:text-green-400",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, Gu = /* @__PURE__ */ l("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  d: "M5 13l4 4L19 7"
}, null, -1), Ju = [
  Gu
], Xu = {
  key: 1,
  class: "w-5 h-5 mr-1",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, Yu = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }),
  /* @__PURE__ */ l("path", {
    d: "M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })
], -1), ed = [
  Yu
], td = /* @__PURE__ */ l("span", { class: "whitespace-nowrap" }, "Copy URL", -1), sd = {
  key: 3,
  class: "pl-2 mt-1"
}, ld = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z"
  })
], -1), nd = [
  ld
], od = {
  key: 4,
  class: "pl-2 mt-1"
}, ad = /* @__PURE__ */ l("svg", {
  class: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
    "clip-rule": "evenodd"
  })
], -1), rd = { class: "mr-1" }, id = {
  key: 0,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, ud = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
  "clip-rule": "evenodd"
}, null, -1), dd = [
  ud
], cd = {
  key: 1,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, fd = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
  "clip-rule": "evenodd"
}, null, -1), vd = [
  fd
], pd = {
  key: 5,
  class: "pl-2 mt-1"
}, md = ["title"], hd = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    fill: "currentColor"
  })
], -1), gd = { class: "whitespace-nowrap" }, yd = { key: 8 }, bd = {
  key: 0,
  class: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50"
}, wd = { class: "mr-1 select-none" }, kd = {
  key: 1,
  class: "flex justify-between items-center"
}, _d = { class: "mr-1 select-none" }, Cs = 25, $d = /* @__PURE__ */ ue({
  __name: "AutoQueryGrid",
  props: {
    filterDefinitions: {},
    id: { default: "AutoQueryGrid" },
    apis: {},
    type: {},
    prefs: {},
    deny: {},
    hide: {},
    selectedColumns: {},
    toolbarButtonClass: {},
    tableStyle: {},
    gridClass: {},
    grid2Class: {},
    grid3Class: {},
    grid4Class: {},
    tableClass: {},
    theadClass: {},
    tbodyClass: {},
    theadRowClass: {},
    theadCellClass: {},
    headerTitle: {},
    headerTitles: {},
    visibleFrom: {},
    rowClass: {},
    rowStyle: {},
    modelTitle: {},
    newButtonLabel: {},
    apiPrefs: {},
    canFilter: {},
    disableKeyBindings: {},
    configureField: {},
    skip: { default: 0 },
    create: { type: Boolean },
    edit: {},
    filters: {}
  },
  emits: ["headerSelected", "rowSelected", "nav"],
  setup(e, { expose: t, emit: s }) {
    const { config: n, autoQueryGridDefaults: a } = Nt(), i = a, u = n.value.storage, d = e, c = s, f = Je("client"), m = "filtering,queryString,queryFilters".split(","), $ = "copyApiUrl,downloadCsv,filtersView,newItem,pagingInfo,pagingNav,preferences,refresh,resetPreferences,toolbar,forms".split(","), k = v(() => d.deny ? Pt(m, d.deny) : Pt(m, i.value.deny)), p = v(() => d.hide ? Pt($, d.hide) : Pt($, i.value.hide));
    function y(C) {
      return k.value[C];
    }
    function _(C) {
      return p.value[C];
    }
    const F = v(() => d.tableStyle ?? i.value.tableStyle), H = v(() => d.gridClass ?? he.getGridClass(F.value)), ae = v(() => d.grid2Class ?? he.getGrid2Class(F.value)), N = v(() => d.grid3Class ?? he.getGrid3Class(F.value)), R = v(() => d.grid4Class ?? he.getGrid4Class(F.value)), M = v(() => d.tableClass ?? he.getTableClass(F.value)), le = v(() => d.theadClass ?? he.getTheadClass(F.value)), w = v(() => d.theadRowClass ?? he.getTheadRowClass(F.value)), j = v(() => d.theadCellClass ?? he.getTheadCellClass(F.value)), U = v(() => d.toolbarButtonClass ?? he.toolbarButtonClass);
    function oe(C, O) {
      var Te;
      if (d.rowClass)
        return d.rowClass(C, O);
      const ve = !!be.value.AnyUpdate, xe = ((Te = me.value) != null && Te.name ? ke(C, me.value.name) : null) == Y.value;
      return he.getTableRowClass(d.tableStyle, O, xe, ve);
    }
    const A = Ps(), K = v(() => {
      var C;
      return Ws(((C = be.value.AnyQuery.viewModel) == null ? void 0 : C.name) || be.value.AnyQuery.dataModel.name);
    }), W = v(() => {
      const C = Object.keys(A).map((O) => O.toLowerCase());
      return ot(K.value).filter((O) => C.includes(O.name.toLowerCase()) || C.includes(O.name.toLowerCase() + "-header")).map((O) => O.name);
    });
    function q() {
      let C = Dt(d.selectedColumns);
      return C.length > 0 ? C : W.value.length > 0 ? W.value : [];
    }
    const S = v(() => {
      let O = q().map((ie) => ie.toLowerCase());
      const ve = ot(K.value);
      return O.length > 0 ? O.map((ie) => ve.find((xe) => xe.name.toLowerCase() === ie)).filter((ie) => ie != null) : ve;
    }), se = v(() => {
      let C = S.value.map((ve) => ve.name), O = Dt(ce.value.selectedColumns).map((ve) => ve.toLowerCase());
      return O.length > 0 ? C.filter((ve) => O.includes(ve.toLowerCase())) : C;
    }), b = I([]), D = I(new tt()), E = I(new tt()), h = I(), x = I(!1), Y = I(), ee = I(), re = I(!1), P = I(), V = I(d.skip), de = I(!1), ce = I({ take: Cs }), fe = I(!1), pe = v(() => b.value.some((C) => C.settings.filters.length > 0 || !!C.settings.sort) || ce.value.selectedColumns), te = v(() => b.value.map((C) => C.settings.filters.length).reduce((C, O) => C + O, 0)), Z = v(() => {
      var C;
      return ot(Ws(Qt.value || ((C = be.value.AnyQuery) == null ? void 0 : C.dataModel.name)));
    }), me = v(() => {
      var C;
      return ss(Ws(Qt.value || ((C = be.value.AnyQuery) == null ? void 0 : C.dataModel.name)));
    }), Ce = v(() => ce.value.take ?? Cs), Ae = v(() => D.value.response ? ke(D.value.response, "results") : []), ye = v(() => {
      var C;
      return (((C = D.value.response) == null ? void 0 : C.total) || Ae.value.length) ?? 0;
    }), Oe = v(() => V.value > 0), De = v(() => V.value > 0), Be = v(() => Ae.value.length >= Ce.value), qe = v(() => Ae.value.length >= Ce.value), Pe = I(), Qe = I(), st = {
      NoQuery: "No Query API was found"
    };
    t({
      update: Ve,
      search: qt,
      createRequestArgs: Ks,
      reset: Gl,
      createDone: as,
      createSave: Xs,
      editDone: Mt,
      editSave: Kt,
      forceUpdate: $t,
      setEdit: bt,
      edit: ee,
      createForm: Pe,
      editForm: Qe,
      apiPrefs: ce,
      results: Ae,
      skip: V,
      take: Ce,
      total: ye
    }), X.interceptors.has("AutoQueryGrid.new") && X.interceptors.invoke("AutoQueryGrid.new", { props: d });
    function lt(C) {
      if (C) {
        if (d.canFilter)
          return d.canFilter(C);
        const O = Z.value.find((ve) => ve.name.toLowerCase() == C.toLowerCase());
        if (O)
          return !xn(O);
      }
      return !1;
    }
    function Fe(C) {
      c("nav", C), y("queryString") && Il(C);
    }
    async function Xe(C) {
      V.value += C, V.value < 0 && (V.value = 0);
      const O = Math.floor(ye.value / Ce.value) * Ce.value;
      V.value > O && (V.value = O), Fe({ skip: V.value || void 0 }), await Ve();
    }
    async function yt(C, O) {
      var xe, Te;
      if (ee.value = null, Y.value = O, !C || !O)
        return;
      let ve = cs(be.value.AnyQuery, { [C]: O });
      const ie = await f.api(ve);
      if (ie.succeeded) {
        let Ne = (xe = ke(ie.response, "results")) == null ? void 0 : xe[0];
        Ne || console.warn(`API ${(Te = be.value.AnyQuery) == null ? void 0 : Te.request.name}(${C}:${O}) returned no results`), ee.value = Ne;
      }
    }
    async function Ke(C, O) {
      var xe;
      c("rowSelected", C, O);
      const ve = (xe = me.value) == null ? void 0 : xe.name, ie = ve ? ke(C, ve) : null;
      !ve || !ie || (Fe({ edit: ie }), yt(ve, ie));
    }
    function B(C, O) {
      var ie;
      if (!y("filtering"))
        return;
      let ve = O.target;
      if (lt(C) && (ve == null ? void 0 : ve.tagName) !== "TD") {
        let xe = (ie = ve == null ? void 0 : ve.closest("TABLE")) == null ? void 0 : ie.getBoundingClientRect(), Te = b.value.find((Ne) => Ne.name.toLowerCase() == C.toLowerCase());
        if (Te && xe) {
          let Ne = 318, pt = xe.x + Ne + 10;
          P.value = {
            column: Te,
            topLeft: {
              x: Math.max(Math.floor(O.clientX + Ne / 2), pt),
              y: xe.y + 45
            }
          };
        }
      }
      c("headerSelected", C, O);
    }
    function G() {
      P.value = null;
    }
    async function ge(C) {
      var ve;
      let O = (ve = P.value) == null ? void 0 : ve.column;
      O && (O.settings = C, u.setItem(bs(O.name), JSON.stringify(O.settings)), await Ve()), P.value = null;
    }
    async function je(C) {
      u.setItem(bs(C.name), JSON.stringify(C.settings)), await Ve();
    }
    async function Ze(C) {
      re.value = !1, ce.value = C, u.setItem(Zs(), JSON.stringify(C)), await Ve();
    }
    function dt(C) {
      var O;
      Pe.value && (Object.assign((O = Pe.value) == null ? void 0 : O.model, C), $t());
    }
    function bt(C) {
      Object.assign(ee.value, C), $t();
    }
    function $t() {
      var O, ve, ie;
      (O = Pe.value) == null || O.forceUpdate(), (ve = Qe.value) == null || ve.forceUpdate();
      const C = He();
      (ie = C == null ? void 0 : C.proxy) == null || ie.$forceUpdate();
    }
    async function Ve() {
      await qt(Ks());
    }
    async function Vt() {
      await Ve();
    }
    const Ut = /iPad|iPhone|iPod/.test(navigator.userAgent);
    async function qt(C) {
      const O = be.value.AnyQuery;
      if (!O) {
        console.error(st.NoQuery);
        return;
      }
      let ve = cs(O, C), ie = await f.api(ve);
      pn((Ne) => {
        D.value.response = D.value.error = void 0, fe.value = Ne, Ut ? jt(() => D.value = ie) : D.value = ie;
      })();
      let Te = ke(ie.response, "results") || [];
      !ie.succeeded || Te.label == 0;
    }
    function Ks() {
      let C = {
        include: "total",
        take: Ce.value
      }, O = Dt(ce.value.selectedColumns || d.selectedColumns);
      if (O.length > 0) {
        let ie = me.value;
        ie && !O.includes(ie.name) && (O = [ie.name, ...O]);
        const xe = Z.value, Te = [];
        O.forEach((Ne) => {
          var ks;
          const pt = xe.find((St) => St.name.toLowerCase() == Ne.toLowerCase());
          (ks = pt == null ? void 0 : pt.ref) != null && ks.selfId && Te.push(pt.ref.selfId), ke(A, Ne) && Te.push(...xe.filter((St) => {
            var ze, At;
            return ((At = (ze = St.ref) == null ? void 0 : ze.selfId) == null ? void 0 : At.toLowerCase()) == Ne.toLowerCase();
          }).map((St) => St.name));
        }), Te.forEach((Ne) => {
          O.includes(Ne) || O.push(Ne);
        }), C.fields = O.join(",");
      }
      let ve = [];
      if (b.value.forEach((ie) => {
        ie.settings.sort && ve.push((ie.settings.sort === "DESC" ? "-" : "") + ie.name), ie.settings.filters.forEach((xe) => {
          let Te = xe.key.replace("%", ie.name);
          C[Te] = xe.value;
        });
      }), d.filters && Object.keys(d.filters).forEach((ie) => {
        C[ie] = d.filters[ie];
      }), y("queryString") && y("queryFilters")) {
        const ie = location.search ? location.search : location.hash.includes("?") ? "?" + xs(location.hash, "?") : "";
        let xe = ll(ie);
        if (Object.keys(xe).forEach((Te) => {
          S.value.find((pt) => pt.name.toLowerCase() === Te.toLowerCase()) && (C[Te] = xe[Te]);
        }), typeof xe.skip < "u") {
          const Te = parseInt(xe.skip);
          isNaN(Te) || (V.value = C.skip = Te);
        }
      }
      return typeof C.skip > "u" && V.value > 0 && (C.skip = V.value), ve.length > 0 && (C.orderBy = ve.join(",")), C;
    }
    function ro() {
      const C = Nl("csv");
      cl(C), typeof window < "u" && window.open(C);
    }
    function io() {
      const C = Nl("json");
      cl(C), de.value = !0, setTimeout(() => de.value = !1, 3e3);
    }
    function Nl(C = "json") {
      var Te;
      const O = Ks(), ve = `/api/${(Te = be.value.AnyQuery) == null ? void 0 : Te.request.name}`, ie = jo(f.baseUrl, Yt(ve, { ...O, jsconfig: "edv" }));
      return ie.indexOf("?") >= 0 ? js(ie, "?") + "." + C + "?" + xs(ie, "?") : ie + ".json";
    }
    async function uo() {
      b.value.forEach((C) => {
        C.settings = { filters: [] }, u.removeItem(bs(C.name));
      }), ce.value = { take: Cs }, u.removeItem(Zs()), await Ve();
    }
    function co() {
      x.value = !0, Fe({ create: null });
    }
    const Qt = v(() => zt(d.type)), ns = v(() => {
      var C;
      return Qt.value || ((C = be.value.AnyQuery) == null ? void 0 : C.dataModel.name);
    }), os = v(() => d.modelTitle || ns.value), fo = v(() => d.newButtonLabel || `New ${os.value}`), Zs = () => {
      var C;
      return `${d.id}/ApiPrefs/${Qt.value || ((C = be.value.AnyQuery) == null ? void 0 : C.dataModel.name)}`;
    }, bs = (C) => {
      var O;
      return `Column/${d.id}:${Qt.value || ((O = be.value.AnyQuery) == null ? void 0 : O.dataModel.name)}.${C}`;
    }, { metadataApi: zl, typeOf: Ws, apiOf: Ul, filterDefinitions: vo } = ut(), { invalidAccessMessage: Gs } = Ol(), ql = v(() => d.filterDefinitions || vo.value), be = v(() => {
      let C = Dt(d.apis);
      return C.length > 0 ? Ht.from(C.map((O) => Ul(O)).filter((O) => O != null).map((O) => O)) : Ht.forType(Qt.value, zl.value);
    }), ws = (C) => `<span class="text-yellow-700">${C}</span>`, Ql = v(() => {
      if (!zl.value)
        return ws(`AppMetadata not loaded, see <a class="${Is.blue}" href="https://docs.servicestack.net/vue/use-metadata" target="_blank">useMetadata()</a>`);
      let O = Dt(d.apis).map((ie) => Ul(ie) == null ? ie : null).filter((ie) => ie != null);
      if (O.length > 0)
        return ws(`Unknown API${O.length > 1 ? "s" : ""}: ${O.join(", ")}`);
      let ve = be.value;
      return ve.empty ? ws("Mising DataModel in property 'type' or AutoQuery APIs to use in property 'apis'") : ve.AnyQuery ? null : ws(st.NoQuery);
    }), Kl = v(() => be.value.AnyQuery && Gs(be.value.AnyQuery)), Zl = v(() => be.value.Create && Gs(be.value.Create)), Wl = v(() => be.value.AnyUpdate && Gs(be.value.AnyUpdate)), po = v(() => ds(be.value.Create));
    v(() => ds(be.value.AnyUpdate));
    const Js = v(() => ds(be.value.Delete));
    function Mt() {
      ee.value = null, Y.value = null, Fe({ edit: void 0 });
    }
    function as() {
      x.value = !1, Fe({ create: void 0 });
    }
    async function Kt() {
      await Ve(), Mt();
    }
    async function Xs() {
      await Ve(), as();
    }
    function Gl() {
      var ve;
      D.value = new tt(), E.value = new tt(), x.value = !1, Y.value = null, ee.value = null, re.value = !1, P.value = null, V.value = d.skip, de.value = !1, ce.value = { take: Cs }, fe.value = !1;
      const C = d.prefs || Ts(u.getItem(Zs()));
      C && (ce.value = C), b.value = S.value.map((ie) => ({
        name: ie.name,
        type: ie.type,
        meta: ie,
        settings: Object.assign(
          {
            filters: []
          },
          Ts(u.getItem(bs(ie.name)))
        )
      })), isNaN(d.skip) || (V.value = d.skip);
      let O = (ve = me.value) == null ? void 0 : ve.name;
      if (y("queryString")) {
        const ie = location.search ? location.search : location.hash.includes("?") ? "?" + xs(location.hash, "?") : "";
        let xe = ll(ie);
        typeof xe.create < "u" ? x.value = typeof xe.create < "u" : O && (typeof xe.edit == "string" || typeof xe.edit == "number") && yt(O, xe.edit);
      }
      d.create === !0 && (x.value = !0), O && d.edit != null && yt(O, d.edit);
    }
    return at(async () => {
      Gl(), await Ve();
    }), (C, O) => {
      const ve = Q("Alert"), ie = Q("EnsureAccessDialog"), xe = Q("AutoCreateForm"), Te = Q("AutoEditForm"), Ne = Q("AutoViewForm"), pt = Q("ErrorSummary"), Jl = Q("Loading"), ks = Q("SettingsIcons"), St = Q("DataGrid");
      return Ql.value ? (o(), r("div", cu, [
        we(ve, { innerHTML: Ql.value }, null, 8, ["innerHTML"])
      ])) : Kl.value ? (o(), r("div", fu, [
        we(ao, { "invalid-access": Kl.value }, null, 8, ["invalid-access"])
      ])) : (o(), r("div", vu, [
        _("forms") && x.value && be.value.Create ? (o(), r("div", pu, [
          Zl.value ? (o(), ne(ie, {
            key: 0,
            title: `Create ${os.value}`,
            "invalid-access": Zl.value,
            "alert-class": "text-yellow-700",
            onDone: as
          }, null, 8, ["title", "invalid-access"])) : J(A).createform ? z(C.$slots, "createform", {
            key: 1,
            type: be.value.Create.request.name,
            configure: C.configureField,
            done: as,
            save: Xs
          }) : (o(), ne(xe, {
            key: 2,
            ref_key: "createForm",
            ref: Pe,
            type: be.value.Create.request.name,
            configure: C.configureField,
            onDone: as,
            onSave: Xs
          }, {
            header: $e(() => [
              z(C.$slots, "formheader", {
                form: "create",
                formInstance: Pe.value,
                apis: be.value,
                type: ns.value,
                updateModel: dt
              })
            ]),
            footer: $e(() => [
              z(C.$slots, "formfooter", {
                form: "create",
                formInstance: Pe.value,
                apis: be.value,
                type: ns.value,
                updateModel: dt
              })
            ]),
            _: 3
          }, 8, ["type", "configure"]))
        ])) : _("forms") && ee.value && be.value.AnyUpdate ? (o(), r("div", mu, [
          Wl.value ? (o(), ne(ie, {
            key: 0,
            title: `Update ${os.value}`,
            "invalid-access": Wl.value,
            "alert-class": "text-yellow-700",
            onDone: Mt
          }, null, 8, ["title", "invalid-access"])) : J(A).editform ? z(C.$slots, "editform", {
            key: 1,
            model: ee.value,
            type: be.value.AnyUpdate.request.name,
            deleteType: Js.value ? be.value.Delete.request.name : null,
            configure: C.configureField,
            done: Mt,
            save: Kt
          }) : (o(), ne(Te, {
            key: 2,
            ref_key: "editForm",
            ref: Qe,
            modelValue: ee.value,
            "onUpdate:modelValue": O[0] || (O[0] = (ze) => ee.value = ze),
            type: be.value.AnyUpdate.request.name,
            deleteType: Js.value ? be.value.Delete.request.name : null,
            configure: C.configureField,
            onDone: Mt,
            onSave: Kt,
            onDelete: Kt
          }, {
            header: $e(() => [
              z(C.$slots, "formheader", {
                form: "edit",
                formInstance: Qe.value,
                apis: be.value,
                type: ns.value,
                model: ee.value,
                id: Y.value,
                updateModel: bt
              })
            ]),
            footer: $e(() => [
              z(C.$slots, "formfooter", {
                form: "edit",
                formInstance: Qe.value,
                apis: be.value,
                type: ns.value,
                model: ee.value,
                id: Y.value,
                updateModel: bt
              })
            ]),
            _: 3
          }, 8, ["modelValue", "type", "deleteType", "configure"]))
        ])) : _("forms") && ee.value ? (o(), r("div", hu, [
          J(A).viewform ? z(C.$slots, "viewform", {
            key: 0,
            model: ee.value,
            apis: be.value,
            done: Mt
          }) : (o(), ne(Ne, {
            key: 1,
            model: ee.value,
            apis: be.value,
            deleteType: Js.value ? be.value.Delete.request.name : null,
            done: Mt,
            onSave: Kt,
            onDelete: Kt
          }, null, 8, ["model", "apis", "deleteType"]))
        ])) : L("", !0),
        J(A).toolbar ? z(C.$slots, "toolbar", { key: 3 }) : _("toolbar") ? (o(), r("div", gu, [
          re.value ? (o(), ne(El, {
            key: 0,
            columns: S.value,
            prefs: ce.value,
            onDone: O[1] || (O[1] = (ze) => re.value = !1),
            onSave: Ze
          }, null, 8, ["columns", "prefs"])) : L("", !0),
          l("div", yu, [
            l("div", bu, [
              _("preferences") ? (o(), r("button", {
                key: 0,
                type: "button",
                class: "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                title: `${os.value} Preferences`,
                onClick: O[2] || (O[2] = (ze) => re.value = !re.value)
              }, _u, 8, wu)) : L("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 1,
                type: "button",
                class: g(["pl-2", Oe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "First page",
                disabled: !Oe.value,
                onClick: O[3] || (O[3] = (ze) => Xe(-ye.value))
              }, xu, 10, $u)) : L("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 2,
                type: "button",
                class: g(["pl-2", De.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Previous page",
                disabled: !De.value,
                onClick: O[4] || (O[4] = (ze) => Xe(-Ce.value))
              }, Mu, 10, Lu)) : L("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 3,
                type: "button",
                class: g(["pl-2", Be.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Next page",
                disabled: !Be.value,
                onClick: O[5] || (O[5] = (ze) => Xe(Ce.value))
              }, Fu, 10, Su)) : L("", !0),
              _("pagingNav") ? (o(), r("button", {
                key: 4,
                type: "button",
                class: g(["pl-2", qe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                title: "Last page",
                disabled: !qe.value,
                onClick: O[6] || (O[6] = (ze) => Xe(ye.value))
              }, Du, 10, Tu)) : L("", !0)
            ]),
            _("pagingInfo") ? (o(), r("div", Pu, [
              l("div", ju, [
                fe.value ? (o(), r("span", Bu, "Querying...")) : L("", !0),
                Ae.value.length ? (o(), r("span", Ou, [
                  Hu,
                  _e(" " + T(V.value + 1) + " - " + T(Math.min(V.value + Ae.value.length, ye.value)) + " ", 1),
                  l("span", null, " of " + T(ye.value), 1)
                ])) : D.value.completed ? (o(), r("span", Ru, "No Results")) : L("", !0)
              ])
            ])) : L("", !0),
            l("div", Eu, [
              _("refresh") ? (o(), r("div", Nu, [
                l("button", {
                  type: "button",
                  onClick: Vt,
                  title: "Refresh",
                  class: g(U.value)
                }, Uu, 2)
              ])) : L("", !0),
              _("downloadCsv") ? (o(), r("div", qu, [
                l("button", {
                  type: "button",
                  onClick: ro,
                  title: "Download CSV",
                  class: g(U.value)
                }, Ku, 2)
              ])) : L("", !0),
              _("copyApiUrl") ? (o(), r("div", Zu, [
                l("button", {
                  type: "button",
                  onClick: io,
                  title: "Copy API URL",
                  class: g(U.value)
                }, [
                  de.value ? (o(), r("svg", Wu, Ju)) : (o(), r("svg", Xu, ed)),
                  td
                ], 2)
              ])) : L("", !0),
              pe.value && _("resetPreferences") ? (o(), r("div", sd, [
                l("button", {
                  type: "button",
                  onClick: uo,
                  title: "Reset Preferences & Filters",
                  class: g(U.value)
                }, nd, 2)
              ])) : L("", !0),
              _("filtersView") && te.value > 0 ? (o(), r("div", od, [
                l("button", {
                  type: "button",
                  onClick: O[7] || (O[7] = (ze) => h.value = h.value == "filters" ? null : "filters"),
                  class: g(U.value),
                  "aria-expanded": "false"
                }, [
                  ad,
                  l("span", rd, T(te.value) + " " + T(te.value == 1 ? "Filter" : "Filters"), 1),
                  h.value != "filters" ? (o(), r("svg", id, dd)) : (o(), r("svg", cd, vd))
                ], 2)
              ])) : L("", !0),
              _("newItem") && be.value.Create && po.value ? (o(), r("div", pd, [
                l("button", {
                  type: "button",
                  onClick: co,
                  title: os.value,
                  class: g(U.value)
                }, [
                  hd,
                  l("span", gd, T(fo.value), 1)
                ], 10, md)
              ])) : L("", !0),
              J(A).toolbarbuttons ? z(C.$slots, "toolbarbuttons", {
                key: 6,
                toolbarButtonClass: U.value
              }) : L("", !0)
            ])
          ])
        ])) : L("", !0),
        h.value == "filters" ? (o(), ne(Rl, {
          key: 5,
          class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
          definitions: ql.value,
          columns: b.value,
          onDone: O[8] || (O[8] = (ze) => h.value = null),
          onChange: je
        }, null, 8, ["definitions", "columns"])) : L("", !0),
        E.value.error ?? D.value.error ? (o(), ne(pt, {
          key: 6,
          status: E.value.error ?? D.value.error
        }, null, 8, ["status"])) : fe.value ? (o(), ne(Jl, {
          key: 7,
          class: "p-2"
        })) : L("", !0),
        P.value ? (o(), r("div", yd, [
          we(Hl, {
            definitions: ql.value,
            column: P.value.column,
            "top-left": P.value.topLeft,
            onDone: G,
            onSave: ge
          }, null, 8, ["definitions", "column", "top-left"])
        ])) : L("", !0),
        Ae.value.length ? (o(), ne(St, {
          key: 9,
          id: C.id,
          items: Ae.value,
          type: C.type,
          "selected-columns": se.value,
          class: "mt-1",
          onFiltersChanged: Ve,
          tableStyle: F.value,
          gridClass: H.value,
          grid2Class: ae.value,
          grid3Class: N.value,
          grid4Class: R.value,
          tableClass: M.value,
          theadClass: le.value,
          theadRowClass: w.value,
          theadCellClass: j.value,
          tbodyClass: C.tbodyClass,
          rowClass: oe,
          onRowSelected: Ke,
          rowStyle: C.rowStyle,
          headerTitle: C.headerTitle,
          headerTitles: C.headerTitles,
          visibleFrom: C.visibleFrom,
          onHeaderSelected: B
        }, ml({
          header: $e(({ column: ze, label: At }) => {
            var Xl;
            return [
              y("filtering") && lt(ze) ? (o(), r("div", bd, [
                l("span", wd, T(At), 1),
                we(ks, {
                  column: b.value.find((mo) => mo.name.toLowerCase() === ze.toLowerCase()),
                  "is-open": ((Xl = P.value) == null ? void 0 : Xl.column.name) === ze
                }, null, 8, ["column", "is-open"])
              ])) : (o(), r("div", kd, [
                l("span", _d, T(At), 1)
              ]))
            ];
          }),
          _: 2
        }, [
          Ie(Object.keys(J(A)), (ze) => ({
            name: ze,
            fn: $e((At) => [
              z(C.$slots, ze, Xt(As(At)))
            ])
          }))
        ]), 1032, ["id", "items", "type", "selected-columns", "tableStyle", "gridClass", "grid2Class", "grid3Class", "grid4Class", "tableClass", "theadClass", "theadRowClass", "theadCellClass", "tbodyClass", "rowStyle", "headerTitle", "headerTitles", "visibleFrom"])) : L("", !0)
      ]));
    };
  }
}), Cd = { class: "flex" }, xd = {
  key: 0,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, Ld = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  })
], -1), Vd = [
  Ld
], Md = /* @__PURE__ */ l("path", {
  d: "M505.5 658.7c3.2 4.4 9.7 4.4 12.9 0l178-246c3.8-5.3 0-12.7-6.5-12.7H643c-10.2 0-19.9 4.9-25.9 13.2L512 558.6L406.8 413.2c-6-8.3-15.6-13.2-25.9-13.2H334c-6.5 0-10.3 7.4-6.5 12.7l178 246z",
  fill: "currentColor"
}, null, -1), Sd = /* @__PURE__ */ l("path", {
  d: "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z",
  fill: "currentColor"
}, null, -1), Ad = [
  Md,
  Sd
], Fd = {
  key: 2,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, Td = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M8.998 4.71L6.354 7.354a.5.5 0 1 1-.708-.707L9.115 3.18A.499.499 0 0 1 9.498 3H9.5a.5.5 0 0 1 .354.147l.01.01l3.49 3.49a.5.5 0 1 1-.707.707l-2.65-2.649V16.5a.5.5 0 0 1-1 0V4.71z",
    fill: "currentColor"
  })
], -1), Id = [
  Td
], Dd = {
  key: 3,
  class: "w-4 h-4",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20"
}, Pd = /* @__PURE__ */ l("g", { fill: "none" }, [
  /* @__PURE__ */ l("path", {
    d: "M10.002 15.29l2.645-2.644a.5.5 0 0 1 .707.707L9.886 16.82a.5.5 0 0 1-.384.179h-.001a.5.5 0 0 1-.354-.147l-.01-.01l-3.49-3.49a.5.5 0 1 1 .707-.707l2.648 2.649V3.5a.5.5 0 0 1 1 0v11.79z",
    fill: "currentColor"
  })
], -1), jd = [
  Pd
], Bd = /* @__PURE__ */ ue({
  __name: "SettingsIcons",
  props: {
    column: {},
    isOpen: { type: Boolean }
  },
  setup(e) {
    return (t, s) => {
      var n, a, i, u, d, c, f;
      return o(), r("div", Cd, [
        (i = (a = (n = t.column) == null ? void 0 : n.settings) == null ? void 0 : a.filters) != null && i.length ? (o(), r("svg", xd, Vd)) : (o(), r("svg", {
          key: 1,
          class: g(["w-4 h-4 transition-transform", t.isOpen ? "rotate-180" : ""]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024"
        }, Ad, 2)),
        ((d = (u = t.column) == null ? void 0 : u.settings) == null ? void 0 : d.sort) === "ASC" ? (o(), r("svg", Fd, Id)) : ((f = (c = t.column) == null ? void 0 : c.settings) == null ? void 0 : f.sort) === "DESC" ? (o(), r("svg", Dd, jd)) : L("", !0)
      ]);
    };
  }
}), Od = /* @__PURE__ */ ue({
  __name: "EnsureAccessDialog",
  props: {
    title: {},
    subtitle: {},
    invalidAccess: {},
    alertClass: {}
  },
  emits: ["done"],
  setup(e) {
    return (t, s) => {
      const n = Q("EnsureAccess"), a = Q("SlideOver");
      return t.invalidAccess ? (o(), ne(a, {
        key: 0,
        title: t.title,
        onDone: s[0] || (s[0] = (i) => t.$emit("done")),
        "content-class": "relative flex-1"
      }, ml({
        default: $e(() => [
          we(n, {
            alertClass: t.alertClass,
            invalidAccess: t.invalidAccess
          }, null, 8, ["alertClass", "invalidAccess"])
        ]),
        _: 2
      }, [
        t.subtitle ? {
          name: "subtitle",
          fn: $e(() => [
            _e(T(t.subtitle), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["title"])) : L("", !0);
    };
  }
}), Hd = ["for"], Rd = ["type", "name", "id", "placeholder", "value", "aria-invalid", "aria-describedby"], Ed = {
  key: 0,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, Nd = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), zd = [
  Nd
], Ud = ["id"], qd = ["id"], Qd = {
  inheritAttrs: !1
}, Kd = /* @__PURE__ */ ue({
  ...Qd,
  __name: "TextInput",
  props: {
    status: {},
    id: {},
    type: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {}
  },
  setup(e, { expose: t }) {
    const s = (p) => p.value, n = e;
    t({
      focus: i
    });
    const a = I();
    function i() {
      var p;
      (p = a.value) == null || p.focus();
    }
    const u = v(() => n.type || "text"), d = v(() => n.label ?? Re(ft(n.id))), c = v(() => n.placeholder ?? d.value);
    function f(p) {
      return n.type === "range" ? p.replace("shadow-sm ", "") : p;
    }
    let m = Je("ApiState", void 0);
    const $ = v(() => _t.call({ responseStatus: n.status ?? (m == null ? void 0 : m.error.value) }, n.id)), k = v(() => [ct.base, $.value ? ct.invalid : f(ct.valid), n.inputClass]);
    return (p, y) => (o(), r("div", {
      class: g([p.$attrs.class])
    }, [
      z(p.$slots, "header", Se({
        inputElement: a.value,
        id: p.id,
        modelValue: p.modelValue,
        status: p.status
      }, p.$attrs)),
      d.value ? (o(), r("label", {
        key: 0,
        for: p.id,
        class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${p.labelClass ?? ""}`)
      }, T(d.value), 11, Hd)) : L("", !0),
      l("div", {
        class: g(f("mt-1 relative"))
      }, [
        l("input", Se({
          ref_key: "inputElement",
          ref: a,
          type: u.value,
          name: p.id,
          id: p.id,
          class: k.value,
          placeholder: c.value,
          value: J(Xn)(u.value, p.modelValue),
          onInput: y[0] || (y[0] = (_) => p.$emit("update:modelValue", s(_.target))),
          "aria-invalid": $.value != null,
          "aria-describedby": `${p.id}-error`,
          step: "any"
        }, J(gt)(p.$attrs, ["class", "value"])), null, 16, Rd),
        $.value ? (o(), r("div", Ed, zd)) : L("", !0)
      ], 2),
      $.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${p.id}-error`
      }, T($.value), 9, Ud)) : p.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${p.id}-description`
      }, T(p.help), 9, qd)) : L("", !0),
      z(p.$slots, "footer", Se({
        inputElement: a.value,
        id: p.id,
        modelValue: p.modelValue,
        status: p.status
      }, p.$attrs))
    ], 2));
  }
}), Zd = ["for"], Wd = { class: "mt-1 relative" }, Gd = ["name", "id", "placeholder", "aria-invalid", "aria-describedby"], Jd = ["id"], Xd = ["id"], Yd = {
  inheritAttrs: !1
}, ec = /* @__PURE__ */ ue({
  ...Yd,
  __name: "TextareaInput",
  props: {
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {}
  },
  setup(e) {
    const t = (c) => c.value, s = e, n = v(() => s.label ?? Re(ft(s.id))), a = v(() => s.placeholder ?? n.value);
    let i = Je("ApiState", void 0);
    const u = v(() => _t.call({ responseStatus: s.status ?? (i == null ? void 0 : i.error.value) }, s.id)), d = v(() => ["shadow-sm " + ct.base, u.value ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + ct.valid, s.inputClass]);
    return (c, f) => (o(), r("div", {
      class: g([c.$attrs.class])
    }, [
      n.value ? (o(), r("label", {
        key: 0,
        for: c.id,
        class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${c.labelClass ?? ""}`)
      }, T(n.value), 11, Zd)) : L("", !0),
      l("div", Wd, [
        l("textarea", Se({
          name: c.id,
          id: c.id,
          class: d.value,
          placeholder: a.value,
          onInput: f[0] || (f[0] = (m) => c.$emit("update:modelValue", t(m.target))),
          "aria-invalid": u.value != null,
          "aria-describedby": `${c.id}-error`
        }, J(gt)(c.$attrs, ["class"])), T(c.modelValue), 17, Gd)
      ]),
      u.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${c.id}-error`
      }, T(u.value), 9, Jd)) : c.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${c.id}-description`
      }, T(c.help), 9, Xd)) : L("", !0)
    ], 2));
  }
}), tc = ["for"], sc = ["id", "name", "value", "aria-invalid", "aria-describedby"], lc = ["value"], nc = ["id"], oc = {
  inheritAttrs: !1
}, ac = /* @__PURE__ */ ue({
  ...oc,
  __name: "SelectInput",
  props: {
    status: {},
    id: {},
    modelValue: {},
    inputClass: {},
    label: {},
    labelClass: {},
    options: {},
    values: {},
    entries: {}
  },
  setup(e) {
    const t = (d) => d.value, s = e, n = v(() => s.label ?? Re(ft(s.id)));
    let a = Je("ApiState", void 0);
    const i = v(() => _t.call({ responseStatus: s.status ?? (a == null ? void 0 : a.error.value) }, s.id)), u = v(() => s.entries || (s.values ? s.values.map((d) => ({ key: d, value: d })) : s.options ? Object.keys(s.options).map((d) => ({ key: d, value: s.options[d] })) : []));
    return (d, c) => (o(), r("div", {
      class: g([d.$attrs.class])
    }, [
      n.value ? (o(), r("label", {
        key: 0,
        for: d.id,
        class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${d.labelClass ?? ""}`)
      }, T(n.value), 11, tc)) : L("", !0),
      l("select", Se({
        id: d.id,
        name: d.id,
        class: [
          "mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md dark:text-white dark:bg-gray-900 dark:border-gray-600 disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:shadow-none",
          i.value ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "shadow-sm border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500",
          d.inputClass
        ],
        value: d.modelValue,
        onInput: c[0] || (c[0] = (f) => d.$emit("update:modelValue", t(f.target))),
        "aria-invalid": i.value != null,
        "aria-describedby": `${d.id}-error`
      }, J(gt)(d.$attrs, ["class"])), [
        (o(!0), r(Me, null, Ie(u.value, (f) => (o(), r("option", {
          value: f.key
        }, T(f.value), 9, lc))), 256))
      ], 16, sc),
      i.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${d.id}-error`
      }, T(i.value), 9, nc)) : L("", !0)
    ], 2));
  }
}), rc = { class: "flex items-center h-5" }, ic = ["id", "name", "checked"], uc = { class: "ml-3 text-sm" }, dc = ["for"], cc = {
  key: 0,
  class: "mt-2 text-sm text-red-500",
  id: "`${id}-error`"
}, fc = {
  key: 1,
  class: "mt-2 text-sm text-gray-500",
  id: "`${id}-description`"
}, vc = {
  inheritAttrs: !1
}, pc = /* @__PURE__ */ ue({
  ...vc,
  __name: "CheckboxInput",
  props: {
    modelValue: { type: Boolean },
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, n = v(() => s.label ?? Re(ft(s.id)));
    let a = Je("ApiState", void 0);
    const i = v(() => _t.call({ responseStatus: s.status ?? (a == null ? void 0 : a.error.value) }, s.id));
    return (u, d) => (o(), r("div", {
      class: g(["relative flex items-start", u.$attrs.class])
    }, [
      l("div", rc, [
        l("input", Se({
          id: u.id,
          name: u.id,
          type: "checkbox",
          checked: u.modelValue,
          onInput: d[0] || (d[0] = (c) => u.$emit("update:modelValue", c.target.checked)),
          class: ["focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800", u.inputClass]
        }, J(gt)(u.$attrs, ["class"])), null, 16, ic)
      ]),
      l("div", uc, [
        l("label", {
          for: u.id,
          class: g(`font-medium text-gray-700 dark:text-gray-300 ${u.labelClass ?? ""}`)
        }, T(n.value), 11, dc),
        i.value ? (o(), r("p", cc, T(i.value), 1)) : u.help ? (o(), r("p", fc, T(u.help), 1)) : L("", !0)
      ])
    ], 2));
  }
}), mc = ["id"], hc = ["for"], gc = { class: "mt-1 relative" }, yc = ["id", "name", "value"], bc = { class: "flex flex-wrap pb-1.5" }, wc = { class: "pt-1.5 pl-1" }, kc = { class: "inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300" }, _c = ["onClick"], $c = /* @__PURE__ */ l("svg", {
  class: "h-2 w-2",
  stroke: "currentColor",
  fill: "none",
  viewBox: "0 0 8 8"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-width": "1.5",
    d: "M1 1l6 6m0-6L1 7"
  })
], -1), Cc = [
  $c
], xc = { class: "pt-1.5 pl-1 shrink" }, Lc = ["type", "name", "id", "aria-invalid", "aria-describedby"], Vc = ["id"], Mc = ["onMouseover", "onClick"], Sc = { class: "block truncate" }, Ac = {
  key: 1,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, Fc = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), Tc = [
  Fc
], Ic = ["id"], Dc = ["id"], Pc = {
  inheritAttrs: !1
}, jc = /* @__PURE__ */ ue({
  ...Pc,
  __name: "TagInput",
  props: {
    status: {},
    id: {},
    type: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    modelValue: { default: () => [] },
    delimiters: { default: () => [","] },
    allowableValues: {},
    string: { type: Boolean },
    maxVisibleItems: { default: 300 },
    converter: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, n = t;
    function a(b) {
      return s.converter ? s.converter(b) : b;
    }
    const i = v(() => Ge(a(s.modelValue), (b) => typeof b == "string" ? b.trim().length == 0 ? [] : b.split(",") : b) || []), u = I(), d = I(!1), c = v(() => {
      const b = $.value.toLowerCase();
      return !s.allowableValues || s.allowableValues.length == 0 ? [] : s.allowableValues.length < 1e3 ? s.allowableValues.filter((D) => !i.value.includes(D) && D.toLowerCase().includes(b)) : s.allowableValues.filter((D) => !i.value.includes(D) && D.startsWith(b));
    });
    function f(b) {
      u.value = b;
    }
    const m = I(null), $ = I(""), k = v(() => s.type || "text"), p = v(() => s.label ?? Re(ft(s.id)));
    let y = Je("ApiState", void 0);
    const _ = v(() => _t.call({ responseStatus: s.status ?? (y == null ? void 0 : y.error.value) }, s.id)), F = v(() => [
      "w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none",
      _.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500" : "shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500",
      s.inputClass
    ]), H = (b) => w(i.value.filter((D) => D != b));
    function ae(b) {
      var D;
      document.activeElement === b.target && ((D = m.value) == null || D.focus());
    }
    const N = I();
    function R() {
      d.value = !0, N.value = !0;
    }
    function M() {
      R();
    }
    function le() {
      q(U()), N.value = !1, setTimeout(() => {
        N.value || (d.value = !1);
      }, 200);
    }
    function w(b) {
      const D = s.string ? b.join(",") : b;
      n("update:modelValue", D);
    }
    function j(b) {
      if (b.key == "Backspace" && $.value.length == 0 && i.value.length > 0 && H(i.value[i.value.length - 1]), !(!s.allowableValues || s.allowableValues.length == 0))
        if (b.code == "Escape" || b.code == "Tab")
          d.value = !1;
        else if (b.code == "Home")
          u.value = c.value[0], K();
        else if (b.code == "End")
          u.value = c.value[c.value.length - 1], K();
        else if (b.code == "ArrowDown") {
          if (d.value = !0, !u.value)
            u.value = c.value[0];
          else {
            const D = c.value.indexOf(u.value);
            u.value = D + 1 < c.value.length ? c.value[D + 1] : c.value[0];
          }
          W();
        } else if (b.code == "ArrowUp") {
          if (!u.value)
            u.value = c.value[c.value.length - 1];
          else {
            const D = c.value.indexOf(u.value);
            u.value = D - 1 >= 0 ? c.value[D - 1] : c.value[c.value.length - 1];
          }
          W();
        } else
          b.code == "Enter" ? u.value && d.value ? (q(u.value), b.preventDefault()) : d.value = !1 : d.value = c.value.length > 0;
    }
    function U() {
      if ($.value.length == 0)
        return "";
      let b = Bo($.value.trim(), ",");
      return b[0] == "," && (b = b.substring(1)), b = b.trim(), b.length == 0 && d.value && c.value.length > 0 ? u.value : b;
    }
    function oe(b) {
      const D = U();
      if (D.length > 0) {
        const E = s.delimiters.some((x) => x == b.key);
        if (E && b.preventDefault(), b.key == "Enter" || b.key == "NumpadEnter" || b.key.length == 1 && E) {
          q(D);
          return;
        }
      }
    }
    const A = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function K() {
      setTimeout(() => {
        let b = Fs(`#${s.id}-tag li.active`);
        b && b.scrollIntoView(A);
      }, 0);
    }
    function W() {
      setTimeout(() => {
        let b = Fs(`#${s.id}-tag li.active`);
        b && ("scrollIntoViewIfNeeded" in b ? b.scrollIntoViewIfNeeded(A) : b.scrollIntoView(A));
      }, 0);
    }
    function q(b) {
      if (b.length === 0)
        return;
      const D = Array.from(i.value);
      D.indexOf(b) == -1 && D.push(b), w(D), $.value = "", d.value = !1;
    }
    function S(b) {
      var E;
      const D = (E = b.clipboardData) == null ? void 0 : E.getData("Text");
      se(D);
    }
    function se(b) {
      if (!b)
        return;
      const D = new RegExp(`\\n|\\t|${s.delimiters.join("|")}`), E = Array.from(i.value);
      b.split(D).map((x) => x.trim()).forEach((x) => {
        E.indexOf(x) == -1 && E.push(x);
      }), w(E), $.value = "";
    }
    return (b, D) => (o(), r("div", {
      class: g([b.$attrs.class]),
      id: `${b.id}-tag`,
      onmousemove: "cancelBlur=true"
    }, [
      p.value ? (o(), r("label", {
        key: 0,
        for: b.id,
        class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${b.labelClass ?? ""}`)
      }, T(p.value), 11, hc)) : L("", !0),
      l("div", gc, [
        l("input", {
          type: "hidden",
          id: b.id,
          name: b.id,
          value: i.value.join(",")
        }, null, 8, yc),
        l("button", {
          class: g(F.value),
          onClick: Ue(ae, ["prevent"]),
          onFocus: D[2] || (D[2] = (E) => d.value = !0),
          tabindex: "-1"
        }, [
          l("div", bc, [
            (o(!0), r(Me, null, Ie(i.value, (E) => (o(), r("div", wc, [
              l("span", kc, [
                _e(T(E) + " ", 1),
                l("button", {
                  type: "button",
                  onClick: (h) => H(E),
                  class: "flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black"
                }, Cc, 8, _c)
              ])
            ]))), 256)),
            l("div", xc, [
              Bt(l("input", Se({
                ref_key: "txtInput",
                ref: m,
                type: k.value,
                role: "combobox",
                "aria-controls": "options",
                "aria-expanded": "false",
                autocomplete: "off",
                spellcheck: "false",
                name: `${b.id}-txt`,
                id: `${b.id}-txt`,
                class: "p-0 dark:bg-transparent rounded-md border-none focus:!border-none focus:!outline-none",
                style: `box-shadow:none !important;width:${$.value.length + 1}ch`,
                "onUpdate:modelValue": D[0] || (D[0] = (E) => $.value = E),
                "aria-invalid": _.value != null,
                "aria-describedby": `${b.id}-error`,
                onKeydown: j,
                onKeypress: oe,
                onPaste: Ue(S, ["prevent", "stop"]),
                onFocus: M,
                onBlur: le,
                onClick: D[1] || (D[1] = (E) => d.value = !0)
              }, J(gt)(b.$attrs, ["class", "required"])), null, 16, Lc), [
                [wo, $.value]
              ])
            ])
          ])
        ], 34),
        d.value && c.value.length ? (o(), r("ul", {
          key: 0,
          class: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
          onKeydown: j,
          id: `${b.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Me, null, Ie(c.value.slice(0, b.maxVisibleItems), (E) => (o(), r("li", {
            class: g([E === u.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (h) => f(E),
            onClick: (h) => q(E),
            role: "option",
            tabindex: "-1"
          }, [
            l("span", Sc, T(E), 1)
          ], 42, Mc))), 256))
        ], 40, Vc)) : L("", !0),
        _.value ? (o(), r("div", Ac, Tc)) : L("", !0)
      ]),
      _.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${b.id}-error`
      }, T(_.value), 9, Ic)) : b.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${b.id}-description`
      }, T(b.help), 9, Dc)) : L("", !0)
    ], 10, mc));
  }
}), Bc = { class: "relative flex-grow mr-2 sm:mr-4" }, Oc = ["for"], Hc = { class: "block mt-2" }, Rc = { class: "sr-only" }, Ec = ["multiple", "name", "id", "placeholder", "aria-invalid", "aria-describedby"], Nc = {
  key: 0,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
}, zc = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), Uc = [
  zc
], qc = ["id"], Qc = ["id"], Kc = { key: 0 }, Zc = ["title"], Wc = ["alt", "src"], Gc = {
  key: 1,
  class: "mt-3"
}, Jc = { class: "w-full" }, Xc = { class: "pr-6 align-bottom pb-2" }, Yc = ["title"], e0 = ["src", "onError"], t0 = ["href"], s0 = {
  key: 1,
  class: "overflow-hidden"
}, l0 = { class: "align-top pb-2 whitespace-nowrap" }, n0 = {
  key: 0,
  class: "text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-black"
}, o0 = /* @__PURE__ */ ue({
  __name: "FileInput",
  props: {
    multiple: { type: Boolean },
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {},
    values: {},
    files: {}
  },
  setup(e) {
    var R;
    const t = e, s = I(null), { assetsPathResolver: n, fallbackPathResolver: a } = Nt(), i = {}, u = I(), d = I(((R = t.files) == null ? void 0 : R.map(c)) || []);
    function c(M) {
      return M.filePath = n(M.filePath), M;
    }
    t.values && t.values.length > 0 && (d.value = t.values.map((M) => {
      let le = M.replace(/\\/g, "/");
      return { fileName: vn(Ot(le, "/"), "."), filePath: le, contentType: al(le) };
    }).map(c));
    const f = v(() => t.label ?? Re(ft(t.id))), m = v(() => t.placeholder ?? f.value);
    let $ = Je("ApiState", void 0);
    const k = v(() => _t.call({ responseStatus: t.status ?? ($ == null ? void 0 : $.error.value) }, t.id)), p = v(() => [
      "block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-900 file:text-violet-700 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800",
      k.value ? "pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500" : "text-slate-500 dark:text-slate-400",
      t.inputClass
    ]), y = (M) => {
      let le = M.target;
      u.value = "", d.value = Array.from(le.files || []).map((w) => ({
        fileName: w.name,
        filePath: bl(w),
        contentLength: w.size,
        contentType: w.type || al(w.name)
      }));
    }, _ = () => {
      var M;
      return (M = s.value) == null ? void 0 : M.click();
    }, F = (M) => M == null ? !1 : M.startsWith("data:") || M.startsWith("blob:"), H = v(() => {
      if (d.value.length > 0)
        return d.value[0].filePath;
      let M = typeof t.modelValue == "string" ? t.modelValue : t.values && t.values[0];
      return M && Tt(n(M)) || null;
    }), ae = (M) => !M || M.startsWith("data:") || M.endsWith(".svg") ? "" : "rounded-full object-cover";
    function N(M) {
      u.value = a(H.value);
    }
    return Et(wn), (M, le) => (o(), r("div", {
      class: g(["flex", M.multiple ? "flex-col" : "justify-between"])
    }, [
      l("div", Bc, [
        f.value ? (o(), r("label", {
          key: 0,
          for: M.id,
          class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${M.labelClass ?? ""}`)
        }, T(f.value), 11, Oc)) : L("", !0),
        l("div", Hc, [
          l("span", Rc, T(M.help ?? f.value), 1),
          l("input", Se({
            ref_key: "input",
            ref: s,
            type: "file",
            multiple: M.multiple,
            name: M.id,
            id: M.id,
            class: p.value,
            placeholder: m.value,
            "aria-invalid": k.value != null,
            "aria-describedby": `${M.id}-error`
          }, M.$attrs, { onChange: y }), null, 16, Ec),
          k.value ? (o(), r("div", Nc, Uc)) : L("", !0)
        ]),
        k.value ? (o(), r("p", {
          key: 1,
          class: "mt-2 text-sm text-red-500",
          id: `${M.id}-error`
        }, T(k.value), 9, qc)) : M.help ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-gray-500",
          id: `${M.id}-description`
        }, T(M.help), 9, Qc)) : L("", !0)
      ]),
      M.multiple ? (o(), r("div", Gc, [
        l("table", Jc, [
          (o(!0), r(Me, null, Ie(d.value, (w) => (o(), r("tr", null, [
            l("td", Xc, [
              l("div", {
                class: "flex w-full",
                title: F(w.filePath) ? "" : w.filePath
              }, [
                l("img", {
                  src: i[J(Tt)(w.filePath)] || J(n)(J(Tt)(w.filePath)),
                  class: g(["mr-2 h-8 w-8", ae(w.filePath)]),
                  onError: (j) => i[J(Tt)(w.filePath)] = J(a)(J(Tt)(w.filePath))
                }, null, 42, e0),
                F(w.filePath) ? (o(), r("span", s0, T(w.fileName), 1)) : (o(), r("a", {
                  key: 0,
                  href: J(n)(w.filePath || ""),
                  target: "_blank",
                  class: "overflow-hidden"
                }, T(w.fileName), 9, t0))
              ], 8, Yc)
            ]),
            l("td", l0, [
              w.contentLength && w.contentLength > 0 ? (o(), r("span", n0, T(J(kl)(w.contentLength)), 1)) : L("", !0)
            ])
          ]))), 256))
        ])
      ])) : (o(), r("div", Kc, [
        H.value ? (o(), r("div", {
          key: 0,
          class: "shrink-0 cursor-pointer",
          title: F(H.value) ? "" : H.value
        }, [
          l("img", {
            onClick: _,
            class: g(["h-16 w-16", ae(H.value)]),
            alt: `Current ${f.value ?? ""}`,
            src: u.value || J(n)(H.value),
            onError: N
          }, null, 42, Wc)
        ], 8, Zc)) : L("", !0)
      ]))
    ], 2));
  }
}), a0 = ["id"], r0 = ["for"], i0 = { class: "relative mt-1" }, u0 = ["id", "placeholder"], d0 = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-gray-400 dark:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z",
    "clip-rule": "evenodd"
  })
], -1), c0 = [
  d0
], f0 = ["id"], v0 = ["onMouseover", "onClick"], p0 = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z",
    "clip-rule": "evenodd"
  })
], -1), m0 = [
  p0
], h0 = {
  key: 2,
  class: "absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none",
  tabindex: "-1"
}, g0 = /* @__PURE__ */ l("svg", {
  class: "h-5 w-5 text-red-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
    "clip-rule": "evenodd"
  })
], -1), y0 = [
  g0
], b0 = ["id"], w0 = ["id"], k0 = /* @__PURE__ */ ue({
  __name: "Autocomplete",
  props: {
    status: {},
    id: {},
    type: {},
    label: {},
    help: {},
    placeholder: {},
    multiple: { type: Boolean, default: !1 },
    required: { type: Boolean },
    options: { default: () => [] },
    modelValue: {},
    match: {},
    viewCount: { default: 100 },
    pageSize: { default: 8 }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: s }) {
    const n = I(!1), a = e, i = s;
    t({ toggle: A });
    function u(S) {
      return Array.isArray(a.modelValue) && a.modelValue.indexOf(S) >= 0;
    }
    const d = v(() => a.label ?? Re(ft(a.id)));
    let c = Je("ApiState", void 0);
    const f = v(() => _t.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, a.id)), m = v(() => [ct.base, f.value ? ct.invalid : ct.valid]), $ = I(null), k = I(""), p = I(null), y = I(a.viewCount), _ = I([]), F = v(() => k.value ? a.options.filter((se) => a.match(se, k.value)).slice(0, y.value) : a.options), H = ["Tab", "Escape", "ArrowDown", "ArrowUp", "Enter", "PageUp", "PageDown", "Home", "End"];
    function ae(S) {
      p.value = S, _.value.indexOf(S) > Math.floor(y.value * 0.9) && (y.value += a.viewCount, q());
    }
    const N = [",", `
`, "	"];
    function R(S) {
      var b;
      const se = (b = S.clipboardData) == null ? void 0 : b.getData("Text");
      M(se);
    }
    function M(S) {
      if (!S)
        return;
      const se = N.some((b) => S.includes(b));
      if (!a.multiple || !se) {
        const b = a.options.filter((D) => a.match(D, S));
        b.length == 1 && (W(b[0]), n.value = !1, Ms());
      } else if (se) {
        const b = new RegExp("\\r|\\n|\\t|,"), E = S.split(b).filter((h) => h.trim()).map((h) => a.options.find((x) => a.match(x, h))).filter((h) => !!h);
        if (E.length > 0) {
          k.value = "", n.value = !1, p.value = null;
          let h = Array.from(a.modelValue || []);
          E.forEach((x) => {
            u(x) ? h = h.filter((Y) => Y != x) : h.push(x);
          }), i("update:modelValue", h), Ms();
        }
      }
    }
    function le(S) {
      H.indexOf(S.code) || K();
    }
    function w(S) {
      if (!(S.shiftKey || S.ctrlKey || S.altKey)) {
        if (!n.value) {
          S.code == "ArrowDown" && (n.value = !0, p.value = _.value[0]);
          return;
        }
        if (S.code == "Escape")
          n.value && (S.stopPropagation(), n.value = !1);
        else if (S.code == "Tab")
          n.value = !1;
        else if (S.code == "Home")
          p.value = _.value[0], U();
        else if (S.code == "End")
          p.value = _.value[_.value.length - 1], U();
        else if (S.code == "ArrowDown") {
          if (!p.value)
            p.value = _.value[0];
          else {
            const se = _.value.indexOf(p.value);
            p.value = se + 1 < _.value.length ? _.value[se + 1] : _.value[0];
          }
          oe();
        } else if (S.code == "ArrowUp") {
          if (!p.value)
            p.value = _.value[_.value.length - 1];
          else {
            const se = _.value.indexOf(p.value);
            p.value = se - 1 >= 0 ? _.value[se - 1] : _.value[_.value.length - 1];
          }
          oe();
        } else
          S.code == "Enter" && (p.value ? (W(p.value), a.multiple || (S.preventDefault(), Ms())) : n.value = !1);
      }
    }
    const j = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode: "if-needed" };
    function U() {
      setTimeout(() => {
        let S = Fs(`#${a.id}-autocomplete li.active`);
        S && S.scrollIntoView(j);
      }, 0);
    }
    function oe() {
      setTimeout(() => {
        let S = Fs(`#${a.id}-autocomplete li.active`);
        S && ("scrollIntoViewIfNeeded" in S ? S.scrollIntoViewIfNeeded(j) : S.scrollIntoView(j));
      }, 0);
    }
    function A(S) {
      var se;
      n.value = S, S && (K(), (se = $.value) == null || se.focus());
    }
    function K() {
      n.value = !0, q();
    }
    function W(S) {
      if (k.value = "", n.value = !1, a.multiple) {
        let se = Array.from(a.modelValue || []);
        u(S) ? se = se.filter((b) => b != S) : se.push(S), p.value = null, i("update:modelValue", se);
      } else {
        let se = S;
        a.modelValue == S && (se = null), i("update:modelValue", se);
      }
    }
    function q() {
      _.value = F.value;
    }
    return Lt(k, q), (S, se) => (o(), r("div", {
      id: `${S.id}-autocomplete`
    }, [
      d.value ? (o(), r("label", {
        key: 0,
        for: `${S.id}-text`,
        class: "block text-sm font-medium text-gray-700 dark:text-gray-300"
      }, T(d.value), 9, r0)) : L("", !0),
      l("div", i0, [
        Bt(l("input", Se({
          ref_key: "txtInput",
          ref: $,
          id: `${S.id}-text`,
          type: "text",
          role: "combobox",
          "aria-controls": "options",
          "aria-expanded": "false",
          autocomplete: "off",
          spellcheck: "false",
          "onUpdate:modelValue": se[0] || (se[0] = (b) => k.value = b),
          class: m.value,
          placeholder: S.multiple || !S.modelValue ? S.placeholder : "",
          onFocus: K,
          onKeydown: w,
          onKeyup: le,
          onClick: K,
          onPaste: R,
          required: !1
        }, S.$attrs), null, 16, u0), [
          [ko, k.value]
        ]),
        l("button", {
          type: "button",
          onClick: se[1] || (se[1] = (b) => A(!n.value)),
          class: "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none",
          tabindex: "-1"
        }, c0),
        n.value ? (o(), r("ul", {
          key: 0,
          class: "absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
          onKeydown: w,
          id: `${S.id}-options`,
          role: "listbox"
        }, [
          (o(!0), r(Me, null, Ie(_.value, (b) => (o(), r("li", {
            class: g([b === p.value ? "active bg-indigo-600 text-white" : "text-gray-900 dark:text-gray-100", "relative cursor-default select-none py-2 pl-3 pr-9"]),
            onMouseover: (D) => ae(b),
            onClick: (D) => W(b),
            role: "option",
            tabindex: "-1"
          }, [
            z(S.$slots, "item", Xt(As(b))),
            u(b) ? (o(), r("span", {
              key: 0,
              class: g(["absolute inset-y-0 right-0 flex items-center pr-4", b === p.value ? "text-white" : "text-indigo-600"])
            }, m0, 2)) : L("", !0)
          ], 42, v0))), 256))
        ], 40, f0)) : !S.multiple && S.modelValue ? (o(), r("div", {
          key: 1,
          onKeydown: w,
          onClick: se[2] || (se[2] = (b) => A(!n.value)),
          class: "h-8 -mt-8 ml-3 pt-0.5"
        }, [
          z(S.$slots, "item", Xt(As(S.modelValue)))
        ], 32)) : L("", !0),
        f.value ? (o(), r("div", h0, y0)) : L("", !0)
      ]),
      f.value ? (o(), r("p", {
        key: 1,
        class: "mt-2 text-sm text-red-500",
        id: `${S.id}-error`
      }, T(f.value), 9, b0)) : S.help ? (o(), r("p", {
        key: 2,
        class: "mt-2 text-sm text-gray-500",
        id: `${S.id}-description`
      }, T(S.help), 9, w0)) : L("", !0)
    ], 8, a0));
  }
}), _0 = ["id", "name", "value"], $0 = { class: "block truncate" }, C0 = /* @__PURE__ */ ue({
  __name: "Combobox",
  props: {
    id: {},
    modelValue: {},
    multiple: { type: Boolean },
    options: {},
    values: {},
    entries: {}
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: s }) {
    const n = e;
    t({
      toggle(p) {
        var y;
        (y = d.value) == null || y.toggle(p);
      }
    });
    const a = s;
    function i(p) {
      a("update:modelValue", p);
    }
    const u = v(() => n.multiple != null ? n.multiple : Array.isArray(n.modelValue)), d = I();
    function c(p, y) {
      return !y || p.value.toLowerCase().includes(y.toLowerCase());
    }
    const f = v(() => n.entries || (n.values ? n.values.map((p) => ({ key: p, value: p })) : n.options ? Object.keys(n.options).map((p) => ({ key: p, value: n.options[p] })) : [])), m = I(u.value ? [] : null);
    function $() {
      let p = n.modelValue && typeof n.modelValue == "object" && !Array.isArray(n.modelValue) ? n.modelValue.key : n.modelValue;
      p == null || p === "" ? m.value = u.value ? [] : null : typeof p == "string" ? m.value = f.value.find((y) => y.key === p) || null : Array.isArray(p) && (m.value = f.value.filter((y) => p.includes(y.key)));
    }
    at($);
    const k = v(() => m.value == null ? "" : Array.isArray(m.value) ? m.value.map((p) => encodeURIComponent(p.key)).join(",") : m.value.key);
    return (p, y) => {
      const _ = Q("Autocomplete");
      return o(), r(Me, null, [
        l("input", {
          type: "hidden",
          id: p.id,
          name: p.id,
          value: k.value
        }, null, 8, _0),
        we(_, Se({
          ref_key: "input",
          ref: d,
          id: p.id,
          options: f.value,
          match: c,
          multiple: u.value
        }, p.$attrs, {
          modelValue: m.value,
          "onUpdate:modelValue": [
            y[0] || (y[0] = (F) => m.value = F),
            i
          ]
        }), {
          item: $e(({ key: F, value: H }) => [
            l("span", $0, T(H), 1)
          ]),
          _: 1
        }, 16, ["id", "options", "multiple", "modelValue"])
      ], 64);
    };
  }
}), x0 = /* @__PURE__ */ ue({
  __name: "DynamicInput",
  props: {
    input: {},
    modelValue: {},
    api: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = v(() => s.input.type || "text"), i = "ignore,css,options,meta,allowableValues,allowableEntries,op,prop,type,id,name".split(","), u = v(() => gt(s.input, i)), d = I(a.value === "file" ? null : s.modelValue[s.input.id]);
    Lt(d, () => {
      s.modelValue[s.input.id] = d.value, n("update:modelValue", s.modelValue);
    });
    const c = v(() => {
      const f = s.modelValue[s.input.id];
      if (s.input.type !== "file" || !f)
        return [];
      if (typeof f == "string")
        return [{ filePath: f, fileName: Ot(f, "/") }];
      if (!Array.isArray(f) && typeof f == "object")
        return f;
      if (Array.isArray(f)) {
        const m = [];
        return f.forEach(($) => {
          typeof $ == "string" ? m.push({ filePath: $, fileName: Ot($, "/") }) : typeof $ == "object" && m.push($);
        }), m;
      }
    });
    return (f, m) => {
      var N, R, M, le, w, j, U, oe, A, K, W, q, S, se, b, D, E, h, x, Y, ee, re, P, V, de, ce, fe, pe;
      const $ = Q("SelectInput"), k = Q("CheckboxInput"), p = Q("TagInput"), y = Q("Combobox"), _ = Q("FileInput"), F = Q("TextareaInput"), H = Q("MarkdownInput"), ae = Q("TextInput");
      return J(X).component(a.value) ? (o(), ne(cn(J(X).component(a.value)), Se({
        key: 0,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[0] || (m[0] = (te) => d.value = te),
        status: (N = f.api) == null ? void 0 : N.error,
        "input-class": (R = f.input.css) == null ? void 0 : R.input,
        "label-class": (M = f.input.css) == null ? void 0 : M.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "select" ? (o(), ne($, Se({
        key: 1,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[1] || (m[1] = (te) => d.value = te),
        status: (le = f.api) == null ? void 0 : le.error,
        "input-class": (w = f.input.css) == null ? void 0 : w.input,
        "label-class": (j = f.input.css) == null ? void 0 : j.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "checkbox" ? (o(), ne(k, Se({
        key: 2,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[2] || (m[2] = (te) => d.value = te),
        status: (U = f.api) == null ? void 0 : U.error,
        "input-class": (oe = f.input.css) == null ? void 0 : oe.input,
        "label-class": (A = f.input.css) == null ? void 0 : A.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "tag" ? (o(), ne(p, Se({
        key: 3,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[3] || (m[3] = (te) => d.value = te),
        status: (K = f.api) == null ? void 0 : K.error,
        "input-class": (W = f.input.css) == null ? void 0 : W.input,
        "label-class": (q = f.input.css) == null ? void 0 : q.label,
        allowableValues: f.input.allowableValues,
        string: ((S = f.input.prop) == null ? void 0 : S.type) == "String"
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "allowableValues", "string"])) : a.value == "combobox" ? (o(), ne(y, Se({
        key: 4,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[4] || (m[4] = (te) => d.value = te),
        status: (se = f.api) == null ? void 0 : se.error,
        "input-class": (b = f.input.css) == null ? void 0 : b.input,
        "label-class": (D = f.input.css) == null ? void 0 : D.label,
        entries: f.input.allowableEntries,
        values: f.input.allowableValues
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class", "entries", "values"])) : a.value == "file" ? (o(), ne(_, Se({
        key: 5,
        id: f.input.id,
        status: (E = f.api) == null ? void 0 : E.error,
        modelValue: d.value,
        "onUpdate:modelValue": m[5] || (m[5] = (te) => d.value = te),
        "input-class": (h = f.input.css) == null ? void 0 : h.input,
        "label-class": (x = f.input.css) == null ? void 0 : x.label,
        files: c.value
      }, u.value), null, 16, ["id", "status", "modelValue", "input-class", "label-class", "files"])) : a.value == "textarea" ? (o(), ne(F, Se({
        key: 6,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[6] || (m[6] = (te) => d.value = te),
        status: (Y = f.api) == null ? void 0 : Y.error,
        "input-class": (ee = f.input.css) == null ? void 0 : ee.input,
        "label-class": (re = f.input.css) == null ? void 0 : re.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : a.value == "MarkdownInput" ? (o(), ne(H, Se({
        key: 7,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[7] || (m[7] = (te) => d.value = te),
        status: (P = f.api) == null ? void 0 : P.error,
        "input-class": (V = f.input.css) == null ? void 0 : V.input,
        "label-class": (de = f.input.css) == null ? void 0 : de.label
      }, u.value), null, 16, ["id", "modelValue", "status", "input-class", "label-class"])) : (o(), ne(ae, Se({
        key: 8,
        type: a.value,
        id: f.input.id,
        modelValue: d.value,
        "onUpdate:modelValue": m[8] || (m[8] = (te) => d.value = te),
        status: (ce = f.api) == null ? void 0 : ce.error,
        "input-class": (fe = f.input.css) == null ? void 0 : fe.input,
        "label-class": (pe = f.input.css) == null ? void 0 : pe.label
      }, u.value), null, 16, ["type", "id", "modelValue", "status", "input-class", "label-class"]));
    };
  }
}), L0 = { class: "lookup-field" }, V0 = ["name", "value"], M0 = {
  key: 0,
  class: "flex justify-between"
}, S0 = ["for"], A0 = {
  key: 0,
  class: "flex items-center"
}, F0 = { class: "text-sm text-gray-500 dark:text-gray-400 pr-1" }, T0 = /* @__PURE__ */ l("span", { class: "sr-only" }, "Clear", -1), I0 = /* @__PURE__ */ l("svg", {
  class: "h-4 w-4",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), D0 = [
  T0,
  I0
], P0 = {
  key: 1,
  class: "mt-1 relative"
}, j0 = { class: "w-full inline-flex truncate" }, B0 = { class: "text-blue-700 dark:text-blue-300 flex cursor-pointer" }, O0 = /* @__PURE__ */ l("span", { class: "absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none" }, [
  /* @__PURE__ */ l("svg", {
    class: "h-5 w-5 text-gray-400 dark:text-gray-500",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    /* @__PURE__ */ l("path", {
      "fill-rule": "evenodd",
      d: "M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",
      "clip-rule": "evenodd"
    })
  ])
], -1), H0 = ["id"], R0 = ["id"], E0 = /* @__PURE__ */ ue({
  __name: "LookupInput",
  props: {
    id: {},
    status: {},
    input: {},
    metadataType: {},
    modelValue: {},
    label: {},
    labelClass: {},
    help: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const { config: s } = Nt(), { metadataApi: n } = ut(), a = e, i = t, u = v(() => a.id || a.input.id), d = v(() => a.label ?? Re(ft(u.value)));
    let c = Je("ApiState", void 0);
    const f = Je("client"), m = v(() => _t.call({ responseStatus: a.status ?? (c == null ? void 0 : c.error.value) }, u.value)), $ = I(""), k = I(""), p = v(() => ke(a.modelValue, u.value)), y = v(() => ot(a.metadataType).find((M) => M.name.toLowerCase() == u.value.toLowerCase())), _ = v(() => {
      var M, le, w;
      return ((w = vt((le = (M = y.value) == null ? void 0 : M.ref) == null ? void 0 : le.model)) == null ? void 0 : w.icon) || s.value.tableIcon;
    });
    function F(M) {
      return M ? a.input.options ? Object.assign({}, M, qs(a.input.options, {
        input: a.input,
        $typeFields: ot(a.metadataType).map((le) => le.name),
        ...X.config.scopeWhitelist
      })) : M : null;
    }
    const H = v(() => {
      var M, le, w, j;
      return F(((M = y.value) == null ? void 0 : M.ref) ?? (a.input.type == "lookup" ? {
        model: a.metadataType.name,
        refId: ((le = ss(a.metadataType)) == null ? void 0 : le.name) ?? "id",
        refLabel: (j = (w = a.metadataType.properties) == null ? void 0 : w.find((U) => U.type == "String" && !U.isPrimaryKey)) == null ? void 0 : j.name
      } : null));
    });
    let ae;
    function N(M) {
      if (M) {
        if (ae == null) {
          console.warn("No ModalProvider required by LookupInput");
          return;
        }
        ae.openModal({ name: "ModalLookup", ref: M }, (le) => {
          if (console.debug("openModal", $.value, " -> ", le, Wt.setRefValue(M, le), M), le) {
            const w = ke(le, M.refId);
            $.value = Wt.setRefValue(M, le) || w;
            const j = J(a.modelValue);
            j[u.value] = w, i("update:modelValue", j);
          }
        });
      }
    }
    function R() {
      a.modelValue[u.value] = null, $.value = "";
    }
    return at(async () => {
      var A, K;
      ae = Je("ModalProvider", void 0);
      const M = a.modelValue;
      a.modelValue[u.value] || (a.modelValue[u.value] = null);
      const le = y.value, w = H.value;
      if (!le || !w) {
        console.warn(`No RefInfo for property '${u.value}'`);
        return;
      }
      $.value = "";
      let j = w.selfId == null ? ke(M, le.name) : ke(M, w.selfId);
      if (ps(j) && (j = ke(M, w.refId)), j == null)
        return;
      const oe = (A = n.value) == null ? void 0 : A.operations.find((W) => {
        var q;
        return ((q = W.dataModel) == null ? void 0 : q.name) == w.model;
      });
      if (console.debug("LookupInput queryOp", oe), oe != null) {
        const W = ke(M, le.name);
        if (ps(W))
          return;
        if ($.value = `${W}`, k.value = le.name, w.refLabel != null) {
          const q = ot(a.metadataType).filter((b) => b.type == w.model);
          q.length || console.warn(`Could not find ${w.model} Property on ${a.metadataType.name}`);
          const S = q.map((b) => ke(M, b.name)).filter((b) => !!b), se = S.length <= 1 ? S[0] : S.find((b) => b[w.refId ?? "id"] == j);
          if (se != null) {
            let b = ke(se, w.refLabel);
            b && ($.value = `${b}`, Wt.setValue(w.model, j, w.refLabel, b));
          } else {
            const b = ((K = le.attributes) == null ? void 0 : K.some((E) => E.name == "Computed")) == !0;
            let D = await Wt.getOrFetchValue(f, n.value, w.model, w.refId, w.refLabel, b, j);
            $.value = D || `${w.model}: ${$.value}`;
          }
        }
      }
    }), (M, le) => {
      const w = Q("Icon");
      return o(), r("div", L0, [
        l("input", {
          type: "hidden",
          name: u.value,
          value: p.value
        }, null, 8, V0),
        d.value ? (o(), r("div", M0, [
          l("label", {
            for: u.value,
            class: g(`block text-sm font-medium text-gray-700 dark:text-gray-300 ${M.labelClass ?? ""}`)
          }, T(d.value), 11, S0),
          p.value ? (o(), r("div", A0, [
            l("span", F0, T(p.value), 1),
            l("button", {
              onClick: R,
              type: "button",
              title: "clear",
              class: "mr-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
            }, D0)
          ])) : L("", !0)
        ])) : L("", !0),
        H.value ? (o(), r("div", P0, [
          l("button", {
            type: "button",
            class: "lookup flex relative w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            onClick: le[0] || (le[0] = (j) => N(H.value)),
            "aria-haspopup": "listbox",
            "aria-expanded": "true",
            "aria-labelledby": "listbox-label"
          }, [
            l("span", j0, [
              l("span", B0, [
                we(w, {
                  class: "mr-1 w-5 h-5",
                  image: _.value
                }, null, 8, ["image"]),
                l("span", null, T($.value), 1)
              ])
            ]),
            O0
          ])
        ])) : L("", !0),
        m.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${u.value}-error`
        }, T(m.value), 9, H0)) : M.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${u.value}-description`
        }, T(M.help), 9, R0)) : L("", !0)
      ]);
    };
  }
}), N0 = /* @__PURE__ */ ue({
  __name: "AutoFormFields",
  props: {
    modelValue: {},
    type: {},
    metaType: {},
    api: {},
    formLayout: {},
    configureField: {},
    configureFormLayout: {},
    hideSummary: { type: Boolean },
    flexClass: { default: "flex flex-1 flex-col justify-between" },
    divideClass: { default: "divide-y divide-gray-200 px-4 sm:px-6" },
    spaceClass: { default: "space-y-6 pt-6 pb-5" },
    fieldsetClass: { default: "grid grid-cols-12 gap-6" }
  },
  emits: ["update:modelValue"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s;
    t({ forceUpdate: i, props: n, updateValue: d });
    function i() {
      var R;
      const N = He();
      (R = N == null ? void 0 : N.proxy) == null || R.$forceUpdate();
    }
    function u(N, R) {
      d(N.id, ke(R, N.id));
    }
    function d(N, R) {
      n.modelValue[N] = R, a("update:modelValue", n.modelValue), i();
    }
    const { metadataApi: c, apiOf: f, typeOf: m, typeOfRef: $, createFormLayout: k, Crud: p } = ut(), y = v(() => n.type || zt(n.modelValue)), _ = v(() => n.metaType ?? m(y.value)), F = v(() => {
      var N, R;
      return $((R = (N = c.value) == null ? void 0 : N.operations.find((M) => M.request.name == y.value)) == null ? void 0 : R.dataModel) || _.value;
    });
    function H() {
      const N = _.value;
      if (!N) {
        if (n.formLayout) {
          const U = n.formLayout.map((oe) => {
            const A = { name: oe.id, type: Jo(oe.type) }, K = Object.assign({ prop: A }, oe);
            return n.configureField && n.configureField(K), K;
          });
          return n.configureFormLayout && n.configureFormLayout(U), U;
        }
        throw new Error(`MetadataType for ${y.value} not found`);
      }
      const R = ot(N), M = F.value, le = n.formLayout ? Array.from(n.formLayout) : k(N), w = [], j = f(N.name);
      return le.forEach((U) => {
        var W;
        const oe = R.find((q) => q.name == U.name);
        if (U.ignore)
          return;
        const A = ((W = M == null ? void 0 : M.properties) == null ? void 0 : W.find((q) => {
          var S;
          return q.name.toLowerCase() == ((S = U.name) == null ? void 0 : S.toLowerCase());
        })) ?? oe, K = Object.assign({ prop: A, op: j }, U);
        n.configureField && n.configureField(K), w.push(K);
      }), n.configureFormLayout && n.configureFormLayout(w), w;
    }
    const ae = () => H().filter((N) => N.type != "hidden").map((N) => N.id);
    return (N, R) => {
      var j;
      const M = Q("ErrorSummary"), le = Q("LookupInput"), w = Q("DynamicInput");
      return o(), r(Me, null, [
        N.hideSummary ? L("", !0) : (o(), ne(M, {
          key: 0,
          status: (j = N.api) == null ? void 0 : j.error,
          except: ae()
        }, null, 8, ["status", "except"])),
        l("div", {
          class: g(N.flexClass)
        }, [
          l("div", {
            class: g(N.divideClass)
          }, [
            l("div", {
              class: g(N.spaceClass)
            }, [
              l("fieldset", {
                class: g(N.fieldsetClass)
              }, [
                (o(!0), r(Me, null, Ie(H(), (U) => {
                  var oe, A, K;
                  return o(), r("div", {
                    key: U.id,
                    class: g([
                      "w-full",
                      ((oe = U.css) == null ? void 0 : oe.field) ?? (U.type == "textarea" ? "col-span-12" : "col-span-12 xl:col-span-6" + (U.type == "checkbox" ? " flex items-center" : "")),
                      U.type == "hidden" ? "hidden" : ""
                    ])
                  }, [
                    U.type === "lookup" || ((A = U.prop) == null ? void 0 : A.ref) != null && U.type != "file" && !U.prop.isPrimaryKey ? (o(), ne(le, {
                      key: 0,
                      metadataType: F.value,
                      input: U,
                      modelValue: N.modelValue,
                      "onUpdate:modelValue": (W) => u(U, W),
                      status: (K = N.api) == null ? void 0 : K.error
                    }, null, 8, ["metadataType", "input", "modelValue", "onUpdate:modelValue", "status"])) : (o(), ne(w, {
                      key: 1,
                      input: U,
                      modelValue: N.modelValue,
                      "onUpdate:modelValue": R[0] || (R[0] = (W) => N.$emit("update:modelValue", W)),
                      api: N.api
                    }, null, 8, ["input", "modelValue", "api"]))
                  ], 2);
                }), 128))
              ], 2)
            ], 2)
          ], 2)
        ], 2)
      ], 64);
    };
  }
}), z0 = { key: 0 }, U0 = { class: "text-red-700" }, q0 = /* @__PURE__ */ l("b", null, "type", -1), Q0 = { key: 0 }, K0 = { key: 2 }, Z0 = ["innerHTML"], W0 = /* @__PURE__ */ l("input", {
  type: "submit",
  class: "hidden"
}, null, -1), G0 = { class: "flex justify-end" }, J0 = /* @__PURE__ */ l("div", null, null, -1), X0 = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, Y0 = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), ef = { class: "fixed inset-0 overflow-hidden" }, tf = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, sf = { class: "flex-1" }, lf = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, nf = { class: "flex items-start justify-between space-x-3" }, of = { class: "space-y-1" }, af = { key: 0 }, rf = { key: 2 }, uf = ["innerHTML"], df = { class: "flex h-7 items-center" }, cf = { class: "flex justify-end" }, ff = /* @__PURE__ */ ue({
  __name: "AutoForm",
  props: {
    type: {},
    modelValue: {},
    heading: {},
    subHeading: {},
    showLoading: { type: Boolean, default: !0 },
    jsconfig: { default: "eccn,edv" },
    formStyle: { default: "card" },
    metaType: {},
    configureField: {},
    configureFormLayout: {},
    panelClass: {},
    bodyClass: {},
    formClass: {},
    innerFormClass: {},
    headerClass: { default: "p-6" },
    buttonsClass: {},
    headingClass: {},
    subHeadingClass: {},
    submitLabel: { default: "Submit" },
    allowSubmit: {}
  },
  emits: ["success", "error", "done", "update:modelValue"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s, i = I(), u = I(1), d = I();
    function c() {
      var de;
      u.value++, W.value = K();
      const V = He();
      (de = V == null ? void 0 : V.proxy) == null || de.$forceUpdate();
    }
    async function f(V) {
      Object.assign(W.value, V), c(), await jt(() => null);
    }
    ms("ModalProvider", {
      openModal: p
    });
    const $ = I(), k = I();
    function p(V, de) {
      $.value = V, k.value = de;
    }
    async function y(V) {
      k.value && k.value(V), $.value = void 0, k.value = void 0;
    }
    const _ = ys(), { getTypeName: F } = so(), { typeOf: H, Crud: ae, createDto: N } = ut(), R = I(new tt()), M = v(() => n.panelClass || Ee.panelClass(n.formStyle)), le = v(() => n.formClass || n.formStyle == "card" ? "shadow sm:rounded-md" : Gt.formClass), w = v(() => n.headingClass || Ee.headingClass(n.formStyle)), j = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), U = v(() => typeof n.buttonsClass == "string" ? n.buttonsClass : Ee.buttonsClass), oe = v(() => {
      var V;
      return n.type ? F(n.type) : (V = n.modelValue) != null && V.getTypeName ? n.modelValue.getTypeName() : null;
    }), A = v(() => n.metaType ?? H(oe.value)), K = () => n.modelValue || se(), W = I(K()), q = v(() => _.loading.value), S = v(() => {
      var V;
      return n.heading != null ? n.heading : ((V = A.value) == null ? void 0 : V.description) || Re(oe.value);
    });
    t({ forceUpdate: c, props: n, setModel: f, formFields: i, submit: D, close: re, model: W });
    function se() {
      return typeof n.type == "string" ? N(n.type) : n.type ? new n.type() : n.modelValue;
    }
    async function b(V) {
      if (!V || V.tagName != "FORM") {
        console.error("Not a valid form", V);
        return;
      }
      const de = se();
      let ce = Ge(de == null ? void 0 : de.getMethod, (te) => typeof te == "function" ? te() : null) || "POST", fe = Ge(de == null ? void 0 : de.createResponse, (te) => typeof te == "function" ? te() : null) == null;
      const pe = n.jsconfig;
      if (hl.hasRequestBody(ce)) {
        let te = new de.constructor(), Z = new FormData(V);
        fe ? R.value = await _.apiFormVoid(te, Z, { jsconfig: pe }) : R.value = await _.apiForm(te, Z, { jsconfig: pe });
      } else {
        let te = new de.constructor(Oo(W.value));
        console.debug("AutoForm.submit", te), fe ? R.value = await _.apiVoid(te, { jsconfig: pe }) : R.value = await _.api(te, { jsconfig: pe });
      }
      R.value.succeeded ? (a("success", R.value.response), re()) : a("error", R.value.error);
    }
    async function D() {
      b(d.value);
    }
    function E(V) {
      a("update:modelValue", V);
    }
    function h() {
      a("done");
    }
    const x = I(!1), Y = I(""), ee = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(x, () => {
      xt(ee, Y, x.value), x.value || setTimeout(h, 700);
    }), x.value = !0;
    function re() {
      n.formStyle == "slideOver" ? x.value = !1 : h();
    }
    const P = (V) => {
      V.key === "Escape" && re();
    };
    return at(() => window.addEventListener("keydown", P)), Et(() => window.removeEventListener("keydown", P)), (V, de) => {
      var Ce, Ae, ye, Oe, De, Be, qe, Pe, Qe, st, lt;
      const ce = Q("AutoFormFields"), fe = Q("FormLoading"), pe = Q("PrimaryButton"), te = Q("CloseButton"), Z = Q("SecondaryButton"), me = Q("ModalLookup");
      return o(), r("div", null, [
        A.value ? V.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: g(M.value)
        }, [
          l("form", {
            ref_key: "elForm",
            ref: d,
            onSubmit: de[0] || (de[0] = Ue((Fe) => b(Fe.target), ["prevent"])),
            autocomplete: "off",
            class: g(V.innerFormClass)
          }, [
            l("div", {
              class: g(V.bodyClass)
            }, [
              l("div", {
                class: g(V.headerClass)
              }, [
                V.$slots.heading ? (o(), r("div", Q0, [
                  z(V.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: g(w.value)
                }, T(S.value), 3)),
                V.$slots.subheading ? (o(), r("div", K0, [
                  z(V.$slots, "subheading")
                ])) : V.subHeading ? (o(), r("p", {
                  key: 3,
                  class: g(j.value)
                }, T(V.subHeading), 3)) : (Ce = A.value) != null && Ce.notes ? (o(), r("p", {
                  key: 4,
                  class: g(["notes", j.value]),
                  innerHTML: (Ae = A.value) == null ? void 0 : Ae.notes
                }, null, 10, Z0)) : L("", !0)
              ], 2),
              z(V.$slots, "header", {
                instance: (ye = He()) == null ? void 0 : ye.exposed,
                model: W.value
              }),
              W0,
              (o(), ne(ce, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                type: V.type,
                modelValue: W.value,
                "onUpdate:modelValue": E,
                api: R.value,
                configureField: V.configureField,
                configureFormLayout: V.configureFormLayout
              }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
              z(V.$slots, "footer", {
                instance: (Oe = He()) == null ? void 0 : Oe.exposed,
                model: W.value
              })
            ], 2),
            z(V.$slots, "buttons", {}, () => {
              var Fe, Xe;
              return [
                l("div", {
                  class: g(U.value)
                }, [
                  l("div", null, [
                    z(V.$slots, "leftbuttons", {
                      instance: (Fe = He()) == null ? void 0 : Fe.exposed,
                      model: W.value
                    })
                  ]),
                  l("div", null, [
                    V.showLoading && q.value ? (o(), ne(fe, { key: 0 })) : L("", !0)
                  ]),
                  l("div", G0, [
                    J0,
                    we(pe, {
                      disabled: q.value || (V.allowSubmit ? !V.allowSubmit(W.value) : !1)
                    }, {
                      default: $e(() => [
                        _e(T(V.submitLabel), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    z(V.$slots, "rightbuttons", {
                      instance: (Xe = He()) == null ? void 0 : Xe.exposed,
                      model: W.value
                    })
                  ])
                ], 2)
              ];
            })
          ], 34)
        ], 2)) : (o(), r("div", X0, [
          Y0,
          l("div", ef, [
            l("div", {
              onMousedown: re,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: de[2] || (de[2] = Ue(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: g(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", Y.value])
                }, [
                  l("form", {
                    ref_key: "elForm",
                    ref: d,
                    class: g(le.value),
                    onSubmit: de[1] || (de[1] = Ue((Fe) => b(Fe.target), ["prevent"]))
                  }, [
                    l("div", tf, [
                      l("div", sf, [
                        l("div", lf, [
                          l("div", nf, [
                            l("div", of, [
                              V.$slots.heading ? (o(), r("div", af, [
                                z(V.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: g(w.value)
                              }, T(S.value), 3)),
                              V.$slots.subheading ? (o(), r("div", rf, [
                                z(V.$slots, "subheading")
                              ])) : V.subHeading ? (o(), r("p", {
                                key: 3,
                                class: g(j.value)
                              }, T(V.subHeading), 3)) : (De = A.value) != null && De.notes ? (o(), r("p", {
                                key: 4,
                                class: g(["notes", j.value]),
                                innerHTML: (Be = A.value) == null ? void 0 : Be.notes
                              }, null, 10, uf)) : L("", !0)
                            ]),
                            l("div", df, [
                              we(te, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: re
                              })
                            ])
                          ])
                        ]),
                        z(V.$slots, "header", {
                          instance: (qe = He()) == null ? void 0 : qe.exposed,
                          model: W.value
                        }),
                        (o(), ne(ce, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          type: V.type,
                          modelValue: W.value,
                          "onUpdate:modelValue": E,
                          api: R.value,
                          configureField: V.configureField,
                          configureFormLayout: V.configureFormLayout
                        }, null, 8, ["type", "modelValue", "api", "configureField", "configureFormLayout"])),
                        z(V.$slots, "footer", {
                          instance: (Pe = He()) == null ? void 0 : Pe.exposed,
                          model: W.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: g(U.value)
                    }, [
                      l("div", null, [
                        z(V.$slots, "leftbuttons", {
                          instance: (Qe = He()) == null ? void 0 : Qe.exposed,
                          model: W.value
                        })
                      ]),
                      l("div", null, [
                        V.showLoading && q.value ? (o(), ne(fe, { key: 0 })) : L("", !0)
                      ]),
                      l("div", cf, [
                        we(Z, {
                          onClick: re,
                          disabled: q.value
                        }, {
                          default: $e(() => [
                            _e("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        we(pe, {
                          class: "ml-4",
                          disabled: q.value || (V.allowSubmit ? !V.allowSubmit(W.value) : !1)
                        }, {
                          default: $e(() => [
                            _e(T(V.submitLabel), 1)
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        z(V.$slots, "rightbuttons", {
                          instance: (st = He()) == null ? void 0 : st.exposed,
                          model: W.value
                        })
                      ])
                    ], 2)
                  ], 34)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), r("div", z0, [
          l("p", U0, [
            _e("Could not create form for unknown "),
            q0,
            _e(" " + T(oe.value), 1)
          ])
        ])),
        ((lt = $.value) == null ? void 0 : lt.name) == "ModalLookup" && $.value.ref ? (o(), ne(me, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: y,
          configureField: V.configureField
        }, null, 8, ["ref-info", "configureField"])) : L("", !0)
      ]);
    };
  }
}), vf = { key: 0 }, pf = { class: "text-red-700" }, mf = /* @__PURE__ */ l("b", null, "type", -1), hf = { key: 0 }, gf = { key: 2 }, yf = ["innerHTML"], bf = { class: "flex justify-end" }, wf = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, kf = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), _f = { class: "fixed inset-0 overflow-hidden" }, $f = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, Cf = { class: "flex-1" }, xf = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, Lf = { class: "flex items-start justify-between space-x-3" }, Vf = { class: "space-y-1" }, Mf = { key: 0 }, Sf = { key: 2 }, Af = ["innerHTML"], Ff = { class: "flex h-7 items-center" }, Tf = { class: "flex justify-end" }, If = /* @__PURE__ */ ue({
  __name: "AutoCreateForm",
  props: {
    type: {},
    formStyle: { default: "slideOver" },
    panelClass: {},
    formClass: {},
    headingClass: {},
    subHeadingClass: {},
    buttonsClass: {},
    heading: {},
    subHeading: {},
    autosave: { type: Boolean, default: !0 },
    showLoading: { type: Boolean, default: !0 },
    showCancel: { type: Boolean, default: !0 },
    configureField: {},
    configureFormLayout: {}
  },
  emits: ["done", "save", "error"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s, i = I(), u = I(1);
    function d() {
      var V, de;
      u.value++, (V = i.value) == null || V.forceUpdate();
      const P = He();
      (de = P == null ? void 0 : P.proxy) == null || de.$forceUpdate();
    }
    function c(P) {
      Object.assign(w.value, P), d();
    }
    function f(P) {
    }
    ms("ModalProvider", {
      openModal: p
    });
    const $ = I(), k = I();
    function p(P, V) {
      $.value = P, k.value = V;
    }
    async function y(P) {
      k.value && k.value(P), $.value = void 0, k.value = void 0;
    }
    const { typeOf: _, typeProperties: F, Crud: H, createDto: ae, formValues: N } = ut(), R = v(() => zt(n.type)), M = v(() => _(R.value)), w = I((() => typeof n.type == "string" ? ae(n.type) : n.type ? new n.type() : null)());
    t({ forceUpdate: d, props: n, setModel: c, formFields: i, model: w });
    const j = v(() => n.panelClass || Ee.panelClass(n.formStyle)), U = v(() => n.formClass || Ee.formClass(n.formStyle)), oe = v(() => n.headingClass || Ee.headingClass(n.formStyle)), A = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), K = v(() => n.buttonsClass || Ee.buttonsClass), W = v(() => H.model(M.value)), q = v(() => {
      var P;
      return n.heading || ((P = _(R.value)) == null ? void 0 : P.description) || (W.value ? `New ${Re(W.value)}` : Re(R.value));
    }), S = I(new tt());
    let se = ys(), b = v(() => se.loading.value);
    X.interceptors.has("AutoCreateForm.new") && X.interceptors.invoke("AutoCreateForm.new", { props: n, model: w });
    async function D(P) {
      var fe, pe;
      let V = P.target;
      if (!n.autosave) {
        a("save", new w.value.constructor(N(V, F(M.value))));
        return;
      }
      let de = Ge((fe = w.value) == null ? void 0 : fe.getMethod, (te) => typeof te == "function" ? te() : null) || "POST", ce = Ge((pe = w.value) == null ? void 0 : pe.createResponse, (te) => typeof te == "function" ? te() : null) == null;
      if (hl.hasRequestBody(de)) {
        let te = new w.value.constructor(), Z = new FormData(V);
        ce ? S.value = await se.apiFormVoid(te, Z, { jsconfig: "eccn" }) : S.value = await se.apiForm(te, Z, { jsconfig: "eccn" });
      } else {
        let te = N(V, F(M.value)), Z = new w.value.constructor(te);
        ce ? S.value = await se.apiVoid(Z, { jsconfig: "eccn" }) : S.value = await se.api(Z, { jsconfig: "eccn" });
      }
      S.value.succeeded ? (V.reset(), a("save", S.value.response)) : a("error", S.value.error);
    }
    function E() {
      a("done");
    }
    const h = I(!1), x = I(""), Y = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(h, () => {
      xt(Y, x, h.value), h.value || setTimeout(E, 700);
    }), h.value = !0;
    function ee() {
      n.formStyle == "slideOver" ? h.value = !1 : E();
    }
    const re = (P) => {
      P.key === "Escape" && ee();
    };
    return at(() => window.addEventListener("keydown", re)), Et(() => window.removeEventListener("keydown", re)), (P, V) => {
      var me, Ce, Ae, ye, Oe, De, Be, qe, Pe;
      const de = Q("AutoFormFields"), ce = Q("FormLoading"), fe = Q("SecondaryButton"), pe = Q("PrimaryButton"), te = Q("CloseButton"), Z = Q("ModalLookup");
      return o(), r("div", null, [
        M.value ? P.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: g(j.value)
        }, [
          l("form", {
            onSubmit: Ue(D, ["prevent"])
          }, [
            l("div", {
              class: g(U.value)
            }, [
              l("div", null, [
                P.$slots.heading ? (o(), r("div", hf, [
                  z(P.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: g(oe.value)
                }, T(q.value), 3)),
                P.$slots.subheading ? (o(), r("div", gf, [
                  z(P.$slots, "subheading")
                ])) : P.subHeading ? (o(), r("p", {
                  key: 3,
                  class: g(A.value)
                }, T(P.subHeading), 3)) : (me = M.value) != null && me.notes ? (o(), r("p", {
                  key: 4,
                  class: g(["notes", A.value]),
                  innerHTML: (Ce = M.value) == null ? void 0 : Ce.notes
                }, null, 10, yf)) : L("", !0)
              ]),
              z(P.$slots, "header", {
                formInstance: (Ae = He()) == null ? void 0 : Ae.exposed,
                model: w.value
              }),
              (o(), ne(de, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                modelValue: w.value,
                "onUpdate:modelValue": f,
                api: S.value,
                configureField: P.configureField,
                configureFormLayout: P.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              z(P.$slots, "footer", {
                formInstance: (ye = He()) == null ? void 0 : ye.exposed,
                model: w.value
              })
            ], 2),
            l("div", {
              class: g(K.value)
            }, [
              l("div", null, [
                P.showLoading && J(b) ? (o(), ne(ce, { key: 0 })) : L("", !0)
              ]),
              l("div", bf, [
                P.showCancel ? (o(), ne(fe, {
                  key: 0,
                  onClick: ee,
                  disabled: J(b)
                }, {
                  default: $e(() => [
                    _e("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"])) : L("", !0),
                we(pe, {
                  type: "submit",
                  class: "ml-4",
                  disabled: J(b)
                }, {
                  default: $e(() => [
                    _e("Save")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 2)
          ], 32)
        ], 2)) : (o(), r("div", wf, [
          kf,
          l("div", _f, [
            l("div", {
              onMousedown: ee,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: V[0] || (V[0] = Ue(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: g(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", x.value])
                }, [
                  l("form", {
                    class: g(U.value),
                    onSubmit: Ue(D, ["prevent"])
                  }, [
                    l("div", $f, [
                      l("div", Cf, [
                        l("div", xf, [
                          l("div", Lf, [
                            l("div", Vf, [
                              P.$slots.heading ? (o(), r("div", Mf, [
                                z(P.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: g(oe.value)
                              }, T(q.value), 3)),
                              P.$slots.subheading ? (o(), r("div", Sf, [
                                z(P.$slots, "subheading")
                              ])) : P.subHeading ? (o(), r("p", {
                                key: 3,
                                class: g(A.value)
                              }, T(P.subHeading), 3)) : (Oe = M.value) != null && Oe.notes ? (o(), r("p", {
                                key: 4,
                                class: g(["notes", A.value]),
                                innerHTML: (De = M.value) == null ? void 0 : De.notes
                              }, null, 10, Af)) : L("", !0)
                            ]),
                            l("div", Ff, [
                              we(te, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: ee
                              })
                            ])
                          ])
                        ]),
                        z(P.$slots, "header", {
                          formInstance: (Be = He()) == null ? void 0 : Be.exposed,
                          model: w.value
                        }),
                        (o(), ne(de, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          modelValue: w.value,
                          "onUpdate:modelValue": f,
                          api: S.value,
                          configureField: P.configureField,
                          configureFormLayout: P.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
                        z(P.$slots, "footer", {
                          formInstance: (qe = He()) == null ? void 0 : qe.exposed,
                          model: w.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: g(K.value)
                    }, [
                      l("div", null, [
                        P.showLoading && J(b) ? (o(), ne(ce, { key: 0 })) : L("", !0)
                      ]),
                      l("div", Tf, [
                        P.showCancel ? (o(), ne(fe, {
                          key: 0,
                          onClick: ee,
                          disabled: J(b)
                        }, {
                          default: $e(() => [
                            _e("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : L("", !0),
                        we(pe, {
                          type: "submit",
                          class: "ml-4",
                          disabled: J(b)
                        }, {
                          default: $e(() => [
                            _e("Save")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 2)
                  ], 34)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), r("div", vf, [
          l("p", pf, [
            _e("Could not create form for unknown "),
            mf,
            _e(" " + T(R.value), 1)
          ])
        ])),
        ((Pe = $.value) == null ? void 0 : Pe.name) == "ModalLookup" && $.value.ref ? (o(), ne(Z, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: y,
          configureField: P.configureField
        }, null, 8, ["ref-info", "configureField"])) : L("", !0)
      ]);
    };
  }
}), Df = { key: 0 }, Pf = { class: "text-red-700" }, jf = /* @__PURE__ */ l("b", null, "type", -1), Bf = { key: 0 }, Of = { key: 2 }, Hf = ["innerHTML"], Rf = { class: "flex justify-end" }, Ef = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, Nf = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), zf = { class: "fixed inset-0 overflow-hidden" }, Uf = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, qf = { class: "flex-1" }, Qf = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, Kf = { class: "flex items-start justify-between space-x-3" }, Zf = { class: "space-y-1" }, Wf = { key: 0 }, Gf = { key: 2 }, Jf = ["innerHTML"], Xf = { class: "flex h-7 items-center" }, Yf = { class: "flex justify-end" }, ev = /* @__PURE__ */ ue({
  __name: "AutoEditForm",
  props: {
    modelValue: {},
    deleteType: {},
    type: {},
    formStyle: { default: "slideOver" },
    panelClass: {},
    formClass: {},
    headingClass: {},
    subHeadingClass: {},
    buttonsClass: {},
    heading: {},
    subHeading: {},
    autosave: { type: Boolean, default: !0 },
    showLoading: { type: Boolean, default: !0 },
    showCancel: { type: Boolean },
    configureField: {},
    configureFormLayout: {}
  },
  emits: ["done", "save", "delete", "error"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s, i = I(), u = I(1);
    function d() {
      var me;
      u.value++, oe.value = U();
      const Z = He();
      (me = Z == null ? void 0 : Z.proxy) == null || me.$forceUpdate();
    }
    function c(Z) {
      Object.assign(oe.value, Z);
    }
    function f(Z) {
    }
    ms("ModalProvider", {
      openModal: p
    });
    const $ = I(), k = I();
    function p(Z, me) {
      $.value = Z, k.value = me;
    }
    async function y(Z) {
      k.value && k.value(Z), $.value = void 0, k.value = void 0;
    }
    const { typeOf: _, apiOf: F, typeProperties: H, createFormLayout: ae, getPrimaryKey: N, Crud: R, createDto: M, formValues: le } = ut(), w = v(() => zt(n.type)), j = v(() => _(w.value)), U = () => typeof n.type == "string" ? M(n.type, us(n.modelValue)) : n.type ? new n.type(us(n.modelValue)) : null, oe = I(U());
    t({ forceUpdate: d, props: n, setModel: c, formFields: i, model: oe });
    const A = v(() => n.panelClass || Ee.panelClass(n.formStyle)), K = v(() => n.formClass || Ee.formClass(n.formStyle)), W = v(() => n.headingClass || Ee.headingClass(n.formStyle)), q = v(() => n.subHeadingClass || Ee.subHeadingClass(n.formStyle)), S = v(() => n.buttonsClass || Ee.buttonsClass), se = v(() => R.model(j.value)), b = v(() => {
      var Z;
      return n.heading || ((Z = _(w.value)) == null ? void 0 : Z.description) || (se.value ? `Update ${Re(se.value)}` : Re(w.value));
    }), D = I(new tt());
    let E = Object.assign({}, us(n.modelValue));
    X.interceptors.has("AutoEditForm.new") && X.interceptors.invoke("AutoEditForm.new", { props: n, model: oe, origModel: E });
    let h = ys(), x = v(() => h.loading.value);
    const Y = () => Ge(_(R.model(j.value)), (Z) => N(Z));
    function ee(Z) {
      const { op: me, prop: Ce } = Z;
      me && (R.isPatch(me) || R.isUpdate(me)) && (Z.disabled = Ce == null ? void 0 : Ce.isPrimaryKey), n.configureField && n.configureField(Z);
    }
    async function re(Z) {
      var Oe, De;
      let me = Z.target;
      if (!n.autosave) {
        a("save", new oe.value.constructor(le(me, H(j.value))));
        return;
      }
      let Ce = Ge((Oe = oe.value) == null ? void 0 : Oe.getMethod, (Be) => typeof Be == "function" ? Be() : null) || "POST", Ae = Ge((De = oe.value) == null ? void 0 : De.createResponse, (Be) => typeof Be == "function" ? Be() : null) == null, ye = Y();
      if (hl.hasRequestBody(Ce)) {
        let Be = new oe.value.constructor(), qe = ke(n.modelValue, ye.name), Pe = new FormData(me);
        ye && !Array.from(Pe.keys()).some((Fe) => Fe.toLowerCase() == ye.name.toLowerCase()) && Pe.append(ye.name, qe);
        let Qe = [];
        const st = w.value && F(w.value);
        if (st && R.isPatch(st)) {
          let Fe = ae(j.value), Xe = {};
          if (ye && (Xe[ye.name] = qe), Fe.forEach((Ke) => {
            let B = Ke.id, G = ke(E, B);
            if (ye && ye.name.toLowerCase() === B.toLowerCase())
              return;
            let ge = Pe.get(B);
            X.interceptors.has("AutoEditForm.save.formLayout") && X.interceptors.invoke("AutoEditForm.save.formLayout", { origValue: G, formLayout: Fe, input: Ke, newValue: ge });
            let je = ge != null, Ze = Ke.type === "checkbox" ? je !== !!G : Ke.type === "file" ? je : ge != G;
            !ge && !G && (Ze = !1), Ze && (ge ? Xe[B] = ge : Ke.type !== "file" && Qe.push(B));
          }), X.interceptors.has("AutoEditForm.save") && X.interceptors.invoke("AutoEditForm.save", { origModel: E, formLayout: Fe, dirtyValues: Xe }), Array.from(Pe.keys()).filter((Ke) => !Xe[Ke]).forEach((Ke) => Pe.delete(Ke)), Array.from(Pe.keys()).filter((Ke) => Ke.toLowerCase() != ye.name.toLowerCase()).length == 0 && Qe.length == 0) {
            pe();
            return;
          }
        }
        const lt = Qe.length > 0 ? { jsconfig: "eccn", reset: Qe } : { jsconfig: "eccn" };
        Ae ? D.value = await h.apiFormVoid(Be, Pe, lt) : D.value = await h.apiForm(Be, Pe, lt);
      } else {
        let Be = le(me, H(j.value));
        ye && !ke(Be, ye.name) && (Be[ye.name] = ke(n.modelValue, ye.name));
        let qe = new oe.value.constructor(Be);
        Ae ? D.value = await h.apiVoid(qe, { jsconfig: "eccn" }) : D.value = await h.api(qe, { jsconfig: "eccn" });
      }
      D.value.succeeded ? (me.reset(), a("save", D.value.response)) : a("error", D.value.error);
    }
    async function P(Z) {
      let me = Y();
      const Ce = me ? ke(n.modelValue, me.name) : null;
      if (!Ce) {
        console.error(`Could not find Primary Key for Type ${w.value} (${se.value})`);
        return;
      }
      const Ae = { [me.name]: Ce }, ye = typeof n.deleteType == "string" ? M(n.deleteType, Ae) : n.deleteType ? new n.deleteType(Ae) : null;
      Ge(ye.createResponse, (De) => typeof De == "function" ? De() : null) == null ? D.value = await h.apiVoid(ye) : D.value = await h.api(ye), D.value.succeeded ? a("delete", D.value.response) : a("error", D.value.error);
    }
    function V() {
      a("done");
    }
    const de = I(!1), ce = I(""), fe = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(de, () => {
      xt(fe, ce, de.value), de.value || setTimeout(V, 700);
    }), de.value = !0;
    function pe() {
      n.formStyle == "slideOver" ? de.value = !1 : V();
    }
    const te = (Z) => {
      Z.key === "Escape" && pe();
    };
    return at(() => window.addEventListener("keydown", te)), Et(() => window.removeEventListener("keydown", te)), (Z, me) => {
      var Pe, Qe, st, lt, Fe, Xe, yt, Ke, B;
      const Ce = Q("AutoFormFields"), Ae = Q("ConfirmDelete"), ye = Q("FormLoading"), Oe = Q("SecondaryButton"), De = Q("PrimaryButton"), Be = Q("CloseButton"), qe = Q("ModalLookup");
      return o(), r("div", null, [
        j.value ? Z.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: g(A.value)
        }, [
          l("form", {
            onSubmit: Ue(re, ["prevent"])
          }, [
            l("div", {
              class: g(K.value)
            }, [
              l("div", null, [
                Z.$slots.heading ? (o(), r("div", Bf, [
                  z(Z.$slots, "heading")
                ])) : (o(), r("h3", {
                  key: 1,
                  class: g(W.value)
                }, T(b.value), 3)),
                Z.$slots.subheading ? (o(), r("div", Of, [
                  z(Z.$slots, "subheading")
                ])) : Z.subHeading ? (o(), r("p", {
                  key: 3,
                  class: g(q.value)
                }, T(Z.subHeading), 3)) : (Pe = j.value) != null && Pe.notes ? (o(), r("p", {
                  key: 4,
                  class: g(["notes", q.value]),
                  innerHTML: (Qe = j.value) == null ? void 0 : Qe.notes
                }, null, 10, Hf)) : L("", !0)
              ]),
              z(Z.$slots, "header", {
                formInstance: (st = He()) == null ? void 0 : st.exposed,
                model: oe.value
              }),
              (o(), ne(Ce, {
                ref_key: "formFields",
                ref: i,
                key: u.value,
                modelValue: oe.value,
                "onUpdate:modelValue": f,
                api: D.value,
                configureField: Z.configureField,
                configureFormLayout: Z.configureFormLayout
              }, null, 8, ["modelValue", "api", "configureField", "configureFormLayout"])),
              z(Z.$slots, "footer", {
                formInstance: (lt = He()) == null ? void 0 : lt.exposed,
                model: oe.value
              })
            ], 2),
            l("div", {
              class: g(S.value)
            }, [
              l("div", null, [
                Z.deleteType ? (o(), ne(Ae, {
                  key: 0,
                  onDelete: P
                })) : L("", !0)
              ]),
              l("div", null, [
                Z.showLoading && J(x) ? (o(), ne(ye, { key: 0 })) : L("", !0)
              ]),
              l("div", Rf, [
                Z.showCancel ? (o(), ne(Oe, {
                  key: 0,
                  onClick: pe,
                  disabled: J(x)
                }, {
                  default: $e(() => [
                    _e("Cancel")
                  ]),
                  _: 1
                }, 8, ["disabled"])) : L("", !0),
                we(De, {
                  type: "submit",
                  class: "ml-4",
                  disabled: J(x)
                }, {
                  default: $e(() => [
                    _e("Save")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 2)
          ], 32)
        ], 2)) : (o(), r("div", Ef, [
          Nf,
          l("div", zf, [
            l("div", {
              onMousedown: pe,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: me[0] || (me[0] = Ue(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: g(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", ce.value])
                }, [
                  l("form", {
                    class: g(K.value),
                    onSubmit: Ue(re, ["prevent"])
                  }, [
                    l("div", Uf, [
                      l("div", qf, [
                        l("div", Qf, [
                          l("div", Kf, [
                            l("div", Zf, [
                              Z.$slots.heading ? (o(), r("div", Wf, [
                                z(Z.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: g(W.value)
                              }, T(b.value), 3)),
                              Z.$slots.subheading ? (o(), r("div", Gf, [
                                z(Z.$slots, "subheading")
                              ])) : Z.subHeading ? (o(), r("p", {
                                key: 3,
                                class: g(q.value)
                              }, T(Z.subHeading), 3)) : (Fe = j.value) != null && Fe.notes ? (o(), r("p", {
                                key: 4,
                                class: g(["notes", q.value]),
                                innerHTML: (Xe = j.value) == null ? void 0 : Xe.notes
                              }, null, 10, Jf)) : L("", !0)
                            ]),
                            l("div", Xf, [
                              we(Be, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: pe
                              })
                            ])
                          ])
                        ]),
                        z(Z.$slots, "header", {
                          formInstance: (yt = He()) == null ? void 0 : yt.exposed,
                          model: oe.value
                        }),
                        (o(), ne(Ce, {
                          ref_key: "formFields",
                          ref: i,
                          key: u.value,
                          modelValue: oe.value,
                          "onUpdate:modelValue": f,
                          api: D.value,
                          configureField: ee,
                          configureFormLayout: Z.configureFormLayout
                        }, null, 8, ["modelValue", "api", "configureFormLayout"])),
                        z(Z.$slots, "footer", {
                          formInstance: (Ke = He()) == null ? void 0 : Ke.exposed,
                          model: oe.value
                        })
                      ])
                    ]),
                    l("div", {
                      class: g(S.value)
                    }, [
                      l("div", null, [
                        Z.deleteType ? (o(), ne(Ae, {
                          key: 0,
                          onDelete: P
                        })) : L("", !0)
                      ]),
                      l("div", null, [
                        Z.showLoading && J(x) ? (o(), ne(ye, { key: 0 })) : L("", !0)
                      ]),
                      l("div", Yf, [
                        Z.showCancel ? (o(), ne(Oe, {
                          key: 0,
                          onClick: pe,
                          disabled: J(x)
                        }, {
                          default: $e(() => [
                            _e("Cancel")
                          ]),
                          _: 1
                        }, 8, ["disabled"])) : L("", !0),
                        we(De, {
                          type: "submit",
                          class: "ml-4",
                          disabled: J(x)
                        }, {
                          default: $e(() => [
                            _e("Save")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ])
                    ], 2)
                  ], 34)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), r("div", Df, [
          l("p", Pf, [
            _e("Could not create form for unknown "),
            jf,
            _e(" " + T(w.value), 1)
          ])
        ])),
        ((B = $.value) == null ? void 0 : B.name) == "ModalLookup" && $.value.ref ? (o(), ne(qe, {
          key: 3,
          "ref-info": $.value.ref,
          onDone: y,
          configureField: Z.configureField
        }, null, 8, ["ref-info", "configureField"])) : L("", !0)
      ]);
    };
  }
}), tv = { key: 0 }, sv = { class: "text-red-700" }, lv = /* @__PURE__ */ l("b", null, "type", -1), nv = { key: 0 }, ov = { key: 2 }, av = ["innerHTML"], rv = {
  key: 2,
  class: "relative z-10",
  "aria-labelledby": "slide-over-title",
  role: "dialog",
  "aria-modal": "true"
}, iv = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), uv = { class: "fixed inset-0 overflow-hidden" }, dv = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, cv = { class: "flex-1" }, fv = { class: "bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, vv = { class: "flex items-start justify-between space-x-3" }, pv = { class: "space-y-1" }, mv = { key: 0 }, hv = { key: 2 }, gv = ["innerHTML"], yv = { class: "flex h-7 items-center" }, bv = /* @__PURE__ */ l("div", { class: "flex justify-end" }, null, -1), wv = /* @__PURE__ */ ue({
  __name: "AutoViewForm",
  props: {
    model: {},
    apis: {},
    typeName: {},
    done: {},
    formStyle: { default: "slideOver" },
    panelClass: {},
    formClass: {},
    headingClass: {},
    subHeadingClass: {},
    heading: {},
    subHeading: {},
    showLoading: { type: Boolean },
    deleteType: {}
  },
  emits: ["done", "save", "delete", "error"],
  setup(e, { emit: t }) {
    const s = e, n = t, { typeOf: a, getPrimaryKey: i, Crud: u, createDto: d } = ut(), c = v(() => s.typeName ?? s.apis.dataModel.name), f = v(() => a(c.value)), m = v(() => s.panelClass || Ee.panelClass(s.formStyle)), $ = v(() => s.formClass || Ee.formClass(s.formStyle)), k = v(() => s.headingClass || Ee.headingClass(s.formStyle)), p = v(() => s.subHeadingClass || Ee.subHeadingClass(s.formStyle)), y = v(() => {
      var A, K;
      return s.heading || ((A = a(c.value)) == null ? void 0 : A.description) || ((K = s.model) != null && K.id ? `${Re(c.value)} ${s.model.id}` : "View " + Re(c.value));
    }), _ = I(new tt());
    Object.assign({}, us(s.model)), X.interceptors.has("AutoViewForm.new") && X.interceptors.invoke("AutoViewForm.new", { props: s });
    let F = ys(), H = v(() => F.loading.value);
    const ae = () => Ge(f.value, (A) => i(A)), N = v(() => f.value);
    async function R(A) {
      let K = ae();
      const W = K ? ke(s.model, K.name) : null;
      if (!W) {
        console.error(`Could not find Primary Key for Type ${c.value} (${N.value})`);
        return;
      }
      const q = { [K.name]: W }, S = typeof s.deleteType == "string" ? d(s.deleteType, q) : s.deleteType ? new s.deleteType(q) : null;
      Ge(S.createResponse, (b) => typeof b == "function" ? b() : null) == null ? _.value = await F.apiVoid(S) : _.value = await F.api(S), _.value.succeeded ? n("delete", _.value.response) : n("error", _.value.error);
    }
    function M() {
      s.done && s.done();
    }
    const le = I(!1), w = I(""), j = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(le, () => {
      xt(j, w, le.value), le.value || setTimeout(M, 700);
    }), le.value = !0;
    function U() {
      s.formStyle == "slideOver" ? le.value = !1 : M();
    }
    const oe = (A) => {
      A.key === "Escape" && U();
    };
    return at(() => window.addEventListener("keydown", oe)), Et(() => window.removeEventListener("keydown", oe)), (A, K) => {
      var b, D, E, h;
      const W = Q("MarkupModel"), q = Q("CloseButton"), S = Q("ConfirmDelete"), se = Q("FormLoading");
      return o(), r("div", null, [
        c.value ? A.formStyle == "card" ? (o(), r("div", {
          key: 1,
          class: g(m.value)
        }, [
          l("div", {
            class: g($.value)
          }, [
            l("div", null, [
              A.$slots.heading ? (o(), r("div", nv, [
                z(A.$slots, "heading")
              ])) : (o(), r("h3", {
                key: 1,
                class: g(k.value)
              }, T(y.value), 3)),
              A.$slots.subheading ? (o(), r("div", ov, [
                z(A.$slots, "subheading")
              ])) : A.subHeading ? (o(), r("p", {
                key: 3,
                class: g(p.value)
              }, T(A.subHeading), 3)) : (b = f.value) != null && b.notes ? (o(), r("p", {
                key: 4,
                class: g(["notes", p.value]),
                innerHTML: (D = f.value) == null ? void 0 : D.notes
              }, null, 10, av)) : L("", !0)
            ]),
            we(W, { value: A.model }, null, 8, ["value"])
          ], 2)
        ], 2)) : (o(), r("div", rv, [
          iv,
          l("div", uv, [
            l("div", {
              onMousedown: U,
              class: "absolute inset-0 overflow-hidden"
            }, [
              l("div", {
                onMousedown: K[0] || (K[0] = Ue(() => {
                }, ["stop"])),
                class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
              }, [
                l("div", {
                  class: g(["pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", w.value])
                }, [
                  l("div", {
                    class: g($.value)
                  }, [
                    l("div", dv, [
                      l("div", cv, [
                        l("div", fv, [
                          l("div", vv, [
                            l("div", pv, [
                              A.$slots.heading ? (o(), r("div", mv, [
                                z(A.$slots, "heading")
                              ])) : (o(), r("h3", {
                                key: 1,
                                class: g(k.value)
                              }, T(y.value), 3)),
                              A.$slots.subheading ? (o(), r("div", hv, [
                                z(A.$slots, "subheading")
                              ])) : A.subHeading ? (o(), r("p", {
                                key: 3,
                                class: g(p.value)
                              }, T(A.subHeading), 3)) : (E = f.value) != null && E.notes ? (o(), r("p", {
                                key: 4,
                                class: g(["notes", p.value]),
                                innerHTML: (h = f.value) == null ? void 0 : h.notes
                              }, null, 10, gv)) : L("", !0)
                            ]),
                            l("div", yv, [
                              we(q, {
                                "button-class": "bg-gray-50 dark:bg-gray-900",
                                onClose: U
                              })
                            ])
                          ])
                        ]),
                        we(W, { value: A.model }, null, 8, ["value"])
                      ])
                    ]),
                    l("div", {
                      class: g(J(Ee).buttonsClass)
                    }, [
                      l("div", null, [
                        A.deleteType ? (o(), ne(S, {
                          key: 0,
                          onDelete: R
                        })) : L("", !0)
                      ]),
                      l("div", null, [
                        A.showLoading && J(H) ? (o(), ne(se, { key: 0 })) : L("", !0)
                      ]),
                      bv
                    ], 2)
                  ], 2)
                ], 2)
              ], 32)
            ], 32)
          ])
        ])) : (o(), r("div", tv, [
          l("p", sv, [
            _e("Could not create view for unknown "),
            lv,
            _e(" " + T(c.value), 1)
          ])
        ]))
      ]);
    };
  }
}), kv = /* @__PURE__ */ l("label", {
  for: "confirmDelete",
  class: "ml-2 mr-2 select-none"
}, "confirm", -1), _v = /* @__PURE__ */ ue({
  __name: "ConfirmDelete",
  emits: ["delete"],
  setup(e, { emit: t }) {
    let s = I(!1);
    const n = t, a = () => {
      s.value && n("delete");
    }, i = v(() => [
      "select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white",
      s.value ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" : "bg-red-400"
    ]);
    return (u, d) => (o(), r(Me, null, [
      Bt(l("input", {
        id: "confirmDelete",
        type: "checkbox",
        class: "focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black",
        "onUpdate:modelValue": d[0] || (d[0] = (c) => un(s) ? s.value = c : s = c)
      }, null, 512), [
        [pl, J(s)]
      ]),
      kv,
      l("span", Se({
        onClick: Ue(a, ["prevent"]),
        class: i.value
      }, u.$attrs), [
        z(u.$slots, "default", {}, () => [
          _e("Delete")
        ])
      ], 16)
    ], 64));
  }
}), $v = {
  class: "flex",
  title: "loading..."
}, Cv = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  width: "24px",
  height: "30px",
  viewBox: "0 0 24 30"
}, xv = /* @__PURE__ */ Ds('<rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate></rect><rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate></rect>', 3), Lv = [
  xv
], Vv = { class: "ml-2 mt-1 text-gray-400" }, Mv = /* @__PURE__ */ ue({
  __name: "FormLoading",
  props: {
    icon: { type: Boolean, default: !0 },
    text: { default: "loading..." }
  },
  setup(e) {
    return Je("ApiState", void 0), (t, s) => (o(), r("div", $v, [
      t.icon ? (o(), r("svg", Cv, Lv)) : L("", !0),
      l("span", Vv, T(t.text), 1)
    ]));
  }
}), Sv = ["onClick"], Av = {
  key: 3,
  class: "flex justify-between items-center"
}, Fv = { class: "mr-1 select-none" }, Tv = ["onClick"], Iv = /* @__PURE__ */ ue({
  __name: "DataGrid",
  props: {
    items: { default: () => [] },
    id: { default: "DataGrid" },
    type: {},
    tableStyle: { default: "stripedRows" },
    selectedColumns: {},
    gridClass: {},
    grid2Class: {},
    grid3Class: {},
    grid4Class: {},
    tableClass: {},
    theadClass: {},
    tbodyClass: {},
    theadRowClass: {},
    theadCellClass: {},
    isSelected: {},
    headerTitle: {},
    headerTitles: {},
    visibleFrom: {},
    rowClass: {},
    rowStyle: {}
  },
  emits: ["headerSelected", "rowSelected"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = I(), i = I(null), u = (E) => i.value === E, d = Ps(), c = (E) => Object.keys(d).find((h) => h.toLowerCase() == E.toLowerCase() + "-header"), f = (E) => Object.keys(d).find((h) => h.toLowerCase() == E.toLowerCase()), m = v(() => nl(s.items).filter((E) => !!(d[E] || d[E + "-header"]))), { typeOf: $, typeProperties: k } = ut(), p = v(() => zt(s.type)), y = v(() => $(p.value)), _ = v(() => k(y.value));
    function F(E) {
      const h = s.headerTitles && ke(s.headerTitles, E) || E;
      return s.headerTitle ? s.headerTitle(h) : mn(h);
    }
    function H(E) {
      const h = E.toLowerCase();
      return _.value.find((x) => x.name.toLowerCase() == h);
    }
    function ae(E) {
      const h = H(E);
      return h != null && h.format ? h.format : (h == null ? void 0 : h.type) == "TimeSpan" || (h == null ? void 0 : h.type) == "TimeOnly" ? { method: "time" } : null;
    }
    const N = {
      xs: "xs:table-cell",
      sm: "sm:table-cell",
      md: "md:table-cell",
      lg: "lg:table-cell",
      xl: "xl:table-cell",
      "2xl": "2xl:table-cell",
      never: ""
    };
    function R(E) {
      const h = s.visibleFrom && ke(s.visibleFrom, E);
      return h && Ge(N[h], (x) => `hidden ${x}`);
    }
    const M = v(() => s.gridClass ?? he.getGridClass(s.tableStyle)), le = v(() => s.grid2Class ?? he.getGrid2Class(s.tableStyle)), w = v(() => s.grid3Class ?? he.getGrid3Class(s.tableStyle)), j = v(() => s.grid4Class ?? he.getGrid4Class(s.tableStyle)), U = v(() => s.tableClass ?? he.getTableClass(s.tableStyle)), oe = v(() => s.tbodyClass ?? he.getTbodyClass(s.tbodyClass)), A = v(() => s.theadClass ?? he.getTheadClass(s.tableStyle)), K = v(() => s.theadRowClass ?? he.getTheadRowClass(s.tableStyle)), W = v(() => s.theadCellClass ?? he.getTheadCellClass(s.tableStyle));
    function q(E, h) {
      return s.rowClass ? s.rowClass(E, h) : he.getTableRowClass(s.tableStyle, h, !!(s.isSelected && s.isSelected(E)), s.isSelected != null);
    }
    function S(E, h) {
      return s.rowStyle ? s.rowStyle(E, h) : void 0;
    }
    const se = v(() => {
      const E = (typeof s.selectedColumns == "string" ? s.selectedColumns.split(",") : s.selectedColumns) || (m.value.length > 0 ? m.value : nl(s.items)), h = _.value.reduce((x, Y) => (x[Y.name.toLowerCase()] = Y.format, x), {});
      return E.filter((x) => {
        var Y;
        return ((Y = h[x.toLowerCase()]) == null ? void 0 : Y.method) != "hidden";
      });
    });
    function b(E, h) {
      n("headerSelected", h, E);
    }
    function D(E, h, x) {
      n("rowSelected", x, E);
    }
    return (E, h) => {
      const x = Q("CellFormat"), Y = Q("PreviewFormat");
      return E.items.length ? (o(), r("div", {
        key: 0,
        ref_key: "refResults",
        ref: a,
        class: g(M.value)
      }, [
        l("div", {
          class: g(le.value)
        }, [
          l("div", {
            class: g(w.value)
          }, [
            l("div", {
              class: g(j.value)
            }, [
              l("table", {
                class: g(U.value)
              }, [
                l("thead", {
                  class: g(A.value)
                }, [
                  l("tr", {
                    class: g(K.value)
                  }, [
                    (o(!0), r(Me, null, Ie(se.value, (ee) => (o(), r("td", {
                      class: g([R(ee), W.value, u(ee) ? "text-gray-900 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"])
                    }, [
                      l("div", {
                        onClick: (re) => b(re, ee)
                      }, [
                        J(d)[ee + "-header"] ? z(E.$slots, ee + "-header", {
                          key: 0,
                          column: ee
                        }) : c(ee) ? z(E.$slots, c(ee), {
                          key: 1,
                          column: ee
                        }) : J(d).header ? z(E.$slots, "header", {
                          key: 2,
                          column: ee,
                          label: F(ee)
                        }) : (o(), r("div", Av, [
                          l("span", Fv, T(F(ee)), 1)
                        ]))
                      ], 8, Sv)
                    ], 2))), 256))
                  ], 2)
                ], 2),
                l("tbody", {
                  class: g(oe.value)
                }, [
                  (o(!0), r(Me, null, Ie(E.items, (ee, re) => (o(), r("tr", {
                    class: g(q(ee, re)),
                    style: vl(S(ee, re)),
                    onClick: (P) => D(P, re, ee)
                  }, [
                    (o(!0), r(Me, null, Ie(se.value, (P) => (o(), r("td", {
                      class: g([R(P), J(he).tableCellClass])
                    }, [
                      J(d)[P] ? z(E.$slots, P, Xt(Se({ key: 0 }, ee))) : f(P) ? z(E.$slots, f(P), Xt(Se({ key: 1 }, ee))) : H(P) ? (o(), ne(x, {
                        key: 2,
                        type: y.value,
                        propType: H(P),
                        modelValue: ee
                      }, null, 8, ["type", "propType", "modelValue"])) : (o(), ne(Y, {
                        key: 3,
                        value: J(ke)(ee, P),
                        format: ae(P)
                      }, null, 8, ["value", "format"]))
                    ], 2))), 256))
                  ], 14, Tv))), 256))
                ], 2)
              ], 2)
            ], 2)
          ], 2)
        ], 2)
      ], 2)) : L("", !0);
    };
  }
}), Dv = ue({
  setup(e, { attrs: t }) {
    const { typeOf: s } = ut();
    function n(a) {
      return a != null && a.format ? a.format : (a == null ? void 0 : a.type) == "TimeSpan" || (a == null ? void 0 : a.type) == "TimeOnly" ? { method: "time" } : null;
    }
    return () => {
      var H;
      const a = n(e.propType), i = ke(e.modelValue, e.propType.name), u = Object.assign({}, e, t), d = Ft("span", { innerHTML: vs(i, a, u) }), c = ps(i) && Array.isArray(i) ? Ft("span", {}, [
        Ft("span", { class: "mr-2" }, `${i.length}`),
        d
      ]) : d, f = (H = e.propType) == null ? void 0 : H.ref;
      if (!f)
        return c;
      const $ = ot(e.type).find((ae) => ae.type === f.model);
      if (!$)
        return c;
      const k = ke(e.modelValue, $.name), p = k && f.refLabel && ke(k, f.refLabel);
      if (!p)
        return c;
      const y = s(f.model), _ = y == null ? void 0 : y.icon, F = _ ? Ft(oo, { image: _, class: "w-5 h-5 mr-1" }) : null;
      return Ft("span", { class: "flex", title: `${f.model} ${i}` }, [
        F,
        p
      ]);
    };
  }
}), Pv = { key: 0 }, jv = {
  key: 0,
  class: "mr-2"
}, Bv = ["innerHTML"], Ov = ["innerHTML"], Hv = {
  inheritAttrs: !1
}, Rv = /* @__PURE__ */ ue({
  ...Hv,
  __name: "PreviewFormat",
  props: {
    value: {},
    format: {},
    includeIcon: { type: Boolean, default: !0 },
    includeCount: { type: Boolean, default: !0 },
    maxFieldLength: { default: 150 },
    maxNestedFields: { default: 2 },
    maxNestedFieldLength: { default: 30 }
  },
  setup(e) {
    const t = e, s = v(() => Array.isArray(t.value));
    return (n, a) => J(ps)(n.value) ? (o(), r("span", Pv, [
      n.includeCount && s.value ? (o(), r("span", jv, T(n.value.length), 1)) : L("", !0),
      l("span", {
        innerHTML: J(vs)(n.value, n.format, n.$attrs)
      }, null, 8, Bv)
    ])) : (o(), r("span", {
      key: 1,
      innerHTML: J(vs)(n.value, n.format, n.$attrs)
    }, null, 8, Ov));
  }
}), Ev = ["innerHTML"], Nv = { key: 0 }, zv = /* @__PURE__ */ l("b", null, null, -1), Uv = { key: 2 }, qv = /* @__PURE__ */ ue({
  __name: "HtmlFormat",
  props: {
    value: {},
    depth: { default: 0 },
    fieldAttrs: {},
    classes: { type: Function, default: (e, t, s, n, a) => n }
  },
  setup(e) {
    const t = e, s = v(() => Rt(t.value)), n = v(() => Array.isArray(t.value)), a = (c) => mn(c), i = (c) => t.fieldAttrs ? t.fieldAttrs(c) : null, u = v(() => nl(t.value)), d = (c) => c ? Object.keys(c).map((f) => ({ key: a(f), val: c[f] })) : [];
    return (c, f) => {
      const m = Q("HtmlFormat", !0);
      return o(), r("div", {
        class: g(c.depth == 0 ? "prose html-format" : "")
      }, [
        s.value ? (o(), r("div", {
          key: 0,
          innerHTML: J(vs)(c.value)
        }, null, 8, Ev)) : n.value ? (o(), r("div", {
          key: 1,
          class: g(c.classes("array", "div", c.depth, J(he).gridClass))
        }, [
          J(Rt)(c.value[0]) ? (o(), r("div", Nv, "[ " + T(c.value.join(", ")) + " ]", 1)) : (o(), r("div", {
            key: 1,
            class: g(c.classes("array", "div", c.depth, J(he).grid2Class))
          }, [
            l("div", {
              class: g(c.classes("array", "div", c.depth, J(he).grid3Class))
            }, [
              l("div", {
                class: g(c.classes("array", "div", c.depth, J(he).grid4Class))
              }, [
                l("table", {
                  class: g(c.classes("object", "table", c.depth, J(he).tableClass))
                }, [
                  l("thead", {
                    class: g(c.classes("array", "thead", c.depth, J(he).theadClass))
                  }, [
                    l("tr", null, [
                      (o(!0), r(Me, null, Ie(u.value, ($) => (o(), r("th", {
                        class: g(c.classes("array", "th", c.depth, J(he).theadCellClass + " whitespace-nowrap"))
                      }, [
                        zv,
                        _e(T(a($)), 1)
                      ], 2))), 256))
                    ])
                  ], 2),
                  l("tbody", null, [
                    (o(!0), r(Me, null, Ie(c.value, ($, k) => (o(), r("tr", {
                      class: g(c.classes("array", "tr", c.depth, k % 2 == 0 ? "bg-white" : "bg-gray-50", k))
                    }, [
                      (o(!0), r(Me, null, Ie(u.value, (p) => (o(), r("td", {
                        class: g(c.classes("array", "td", c.depth, J(he).tableCellClass))
                      }, [
                        we(m, Se({
                          value: $[p],
                          "field-attrs": c.fieldAttrs,
                          depth: c.depth + 1,
                          classes: c.classes
                        }, i(p)), null, 16, ["value", "field-attrs", "depth", "classes"])
                      ], 2))), 256))
                    ], 2))), 256))
                  ])
                ], 2)
              ], 2)
            ], 2)
          ], 2))
        ], 2)) : (o(), r("div", Uv, [
          l("table", {
            class: g(c.classes("object", "table", c.depth, "table-object"))
          }, [
            (o(!0), r(Me, null, Ie(d(c.value), ($) => (o(), r("tr", {
              class: g(c.classes("object", "tr", c.depth, ""))
            }, [
              l("th", {
                class: g(c.classes("object", "th", c.depth, "align-top py-2 px-4 text-left text-sm font-medium tracking-wider whitespace-nowrap"))
              }, T($.key), 3),
              l("td", {
                class: g(c.classes("object", "td", c.depth, "align-top py-2 px-4 text-sm"))
              }, [
                we(m, Se({
                  value: $.val,
                  "field-attrs": c.fieldAttrs,
                  depth: c.depth + 1,
                  classes: c.classes
                }, i($.key)), null, 16, ["value", "field-attrs", "depth", "classes"])
              ], 2)
            ], 2))), 256))
          ], 2)
        ]))
      ], 2);
    };
  }
}), Qv = ["href"], Kv = ["href", "title"], Zv = /* @__PURE__ */ ue({
  __name: "MarkupFormat",
  props: {
    value: {},
    imageClass: { default: "w-8 h-8" }
  },
  setup(e) {
    const t = e, { getMimeType: s } = Uo(), n = t.value;
    let a = typeof t.value;
    const i = a === "string" && n.length ? s(n) : null;
    if (a === "string" && n.length) {
      const u = n.startsWith("https://") || n.startsWith("http://");
      (u || n[0] === "/") && (i != null && i.startsWith("image/")) ? a = "image" : u && (a = "link");
    }
    return (u, d) => {
      const c = Q("Icon"), f = Q("HtmlFormat");
      return J(a) == "link" ? (o(), r("a", {
        key: 0,
        href: u.value,
        class: "text-indigo-600"
      }, T(u.value), 9, Qv)) : J(a) == "image" ? (o(), r("a", {
        key: 1,
        href: u.value,
        title: u.value,
        class: "inline-block"
      }, [
        we(c, {
          src: u.value,
          class: g(u.imageClass)
        }, null, 8, ["src", "class"])
      ], 8, Kv)) : (o(), ne(f, {
        key: 2,
        value: u.value
      }, null, 8, ["value"]));
    };
  }
}), Wv = { class: "my-2 w-full" }, Gv = { class: "leading-7" }, Jv = { class: "px-2 text-left align-top" }, Xv = { colspan: "align-top" }, Yv = { class: "my-2 leading-7" }, ep = {
  colspan: "2",
  class: "px-2 bg-indigo-700 text-white"
}, tp = { class: "leading-7" }, sp = {
  colspan: "2",
  class: "px-2 align-top"
}, lp = /* @__PURE__ */ ue({
  __name: "MarkupModel",
  props: {
    value: {},
    imageClass: {}
  },
  setup(e) {
    const t = e, s = Object.keys(t.value), n = {}, a = {};
    return s.forEach((i) => {
      const u = t.value[i], d = typeof u;
      u == null || d === "function" || d === "symbol" ? n[i] = `(${u == null ? "null" : "t"})` : d === "object" ? a[i] = u : n[i] = u;
    }), (i, u) => {
      const d = Q("MarkupFormat");
      return o(), r("table", Wv, [
        (o(), r(Me, null, Ie(n, (c, f) => l("tr", Gv, [
          l("th", Jv, T(J(Re)(f)), 1),
          l("td", Xv, [
            we(d, { value: c }, null, 8, ["value"])
          ])
        ])), 64)),
        (o(), r(Me, null, Ie(a, (c, f) => (o(), r(Me, null, [
          l("tr", Yv, [
            l("td", ep, T(J(Re)(f)), 1)
          ]),
          l("tr", tp, [
            l("td", sp, [
              we(d, { value: c }, null, 8, ["value"])
            ])
          ])
        ], 64))), 64))
      ]);
    };
  }
}), np = { class: "absolute top-0 right-0 pt-4 pr-4" }, op = ["title"], ap = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), rp = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), ip = [
  ap,
  rp
], up = /* @__PURE__ */ ue({
  __name: "CloseButton",
  props: {
    buttonClass: { default: "bg-white dark:bg-black" },
    title: { default: "Close" }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    return (s, n) => (o(), r("div", np, [
      l("button", {
        type: "button",
        onClick: n[0] || (n[0] = (a) => s.$emit("close")),
        title: s.title,
        class: g([s.buttonClass, "cursor-pointer rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"])
      }, ip, 10, op)
    ]));
  }
}), dp = ["id", "aria-labelledby"], cp = /* @__PURE__ */ l("div", { class: "fixed inset-0" }, null, -1), fp = { class: "fixed inset-0 overflow-hidden" }, vp = { class: "flex h-full flex-col bg-white dark:bg-black shadow-xl" }, pp = { class: "flex min-h-0 flex-1 flex-col overflow-auto" }, mp = { class: "flex-1" }, hp = { class: "relative bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6" }, gp = { class: "flex items-start justify-between space-x-3" }, yp = { class: "space-y-1" }, bp = { key: 0 }, wp = ["id"], kp = {
  key: 2,
  class: "text-sm text-gray-500"
}, _p = { class: "flex h-7 items-center" }, $p = {
  key: 0,
  class: "flex-shrink-0 border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6"
}, Cp = /* @__PURE__ */ ue({
  __name: "SlideOver",
  props: {
    id: { default: "SlideOver" },
    title: {},
    contentClass: { default: "relative mt-6 flex-1 px-4 sm:px-6" }
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = t, n = I(!1), a = I(""), i = {
      entering: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transform transition ease-in-out duration-500 sm:duration-700", from: "translate-x-0", to: "translate-x-full" }
    };
    Lt(n, () => {
      xt(i, a, n.value), n.value || setTimeout(() => s("done"), 700);
    }), n.value = !0;
    const u = () => n.value = !1, d = (c) => {
      c.key === "Escape" && u();
    };
    return at(() => window.addEventListener("keydown", d)), Et(() => window.removeEventListener("keydown", d)), (c, f) => {
      const m = Q("CloseButton");
      return o(), r("div", {
        id: c.id,
        class: "relative z-10",
        "aria-labelledby": c.id + "-title",
        role: "dialog",
        "aria-modal": "true"
      }, [
        cp,
        l("div", fp, [
          l("div", {
            onMousedown: u,
            class: "absolute inset-0 overflow-hidden"
          }, [
            l("div", {
              onMousedown: f[0] || (f[0] = Ue(() => {
              }, ["stop"])),
              class: "pointer-events-none fixed inset-y-0 right-0 flex pl-10"
            }, [
              l("div", {
                class: g(["panel pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg", a.value])
              }, [
                l("div", vp, [
                  l("div", pp, [
                    l("div", mp, [
                      l("div", hp, [
                        l("div", gp, [
                          l("div", yp, [
                            c.$slots.title ? (o(), r("div", bp, [
                              z(c.$slots, "title")
                            ])) : L("", !0),
                            c.title ? (o(), r("h2", {
                              key: 1,
                              class: "text-lg font-medium text-gray-900 dark:text-gray-50",
                              id: c.id + "-title"
                            }, T(c.title), 9, wp)) : L("", !0),
                            c.$slots.subtitle ? (o(), r("p", kp, [
                              z(c.$slots, "subtitle")
                            ])) : L("", !0)
                          ]),
                          l("div", _p, [
                            we(m, {
                              "button-class": "bg-gray-50 dark:bg-gray-900",
                              onClose: u
                            })
                          ])
                        ])
                      ]),
                      l("div", {
                        class: g(c.contentClass)
                      }, [
                        z(c.$slots, "default")
                      ], 2)
                    ])
                  ]),
                  c.$slots.footer ? (o(), r("div", $p, [
                    z(c.$slots, "footer")
                  ])) : L("", !0)
                ])
              ], 2)
            ], 32)
          ], 32)
        ])
      ], 8, dp);
    };
  }
}), xp = ["id", "data-transition-for", "aria-labelledby"], Lp = { class: "fixed inset-0 z-10 overflow-y-auto" }, Vp = { class: "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" }, Mp = {
  key: 1,
  class: "hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10"
}, Sp = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close", -1), Ap = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    "stroke-width": "2",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), Fp = [
  Sp,
  Ap
], Tp = /* @__PURE__ */ ue({
  __name: "ModalDialog",
  props: {
    id: { default: "ModalDialog" },
    modalClass: { default: fl.modalClass },
    sizeClass: { default: fl.sizeClass },
    closeButtonClass: { default: "bg-white dark:bg-black cursor-pointer rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black" },
    configureField: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = Ps(), n = t, a = I(!1), i = I(""), u = {
      entering: { cls: "ease-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100", to: "opacity-0" }
    }, d = I(""), c = {
      entering: { cls: "ease-out duration-300", from: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95", to: "opacity-100 translate-y-0 sm:scale-100" },
      leaving: { cls: "ease-in duration-200", from: "opacity-100 translate-y-0 sm:scale-100", to: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" }
    };
    Lt(a, () => {
      xt(u, i, a.value), xt(c, d, a.value), a.value || setTimeout(() => n("done"), 200);
    }), a.value = !0;
    const f = () => a.value = !1;
    ms("ModalProvider", {
      openModal: p
    });
    const $ = I(), k = I();
    function p(F, H) {
      $.value = F, k.value = H;
    }
    async function y(F) {
      k.value && k.value(F), $.value = void 0, k.value = void 0;
    }
    const _ = (F) => {
      F.key === "Escape" && f();
    };
    return at(() => window.addEventListener("keydown", _)), Et(() => window.removeEventListener("keydown", _)), (F, H) => {
      var N;
      const ae = Q("ModalLookup");
      return o(), r("div", {
        id: F.id,
        "data-transition-for": F.id,
        onMousedown: f,
        class: "relative z-10",
        "aria-labelledby": `${F.id}-title`,
        role: "dialog",
        "aria-modal": "true"
      }, [
        l("div", {
          class: g(["fixed inset-0 bg-gray-500/75 transition-opacity", i.value])
        }, null, 2),
        l("div", Lp, [
          l("div", Vp, [
            l("div", {
              class: g([F.modalClass, F.sizeClass, d.value]),
              onMousedown: H[0] || (H[0] = Ue(() => {
              }, ["stop"]))
            }, [
              l("div", null, [
                J(s).closebutton ? z(F.$slots, "createform", { key: 0 }) : (o(), r("div", Mp, [
                  l("button", {
                    type: "button",
                    onClick: f,
                    class: g(F.closeButtonClass),
                    title: "Close"
                  }, Fp, 2)
                ])),
                z(F.$slots, "default")
              ])
            ], 34),
            z(F.$slots, "bottom")
          ])
        ]),
        ((N = $.value) == null ? void 0 : N.name) == "ModalLookup" && $.value.ref ? (o(), ne(ae, {
          key: 0,
          "ref-info": $.value.ref,
          onDone: y,
          configureField: F.configureField
        }, null, 8, ["ref-info", "configureField"])) : L("", !0)
      ], 40, xp);
    };
  }
}), Ip = {
  class: "pt-2 overflow-auto",
  style: { "min-height": "620px" }
}, Dp = { class: "mt-3 pl-5 flex flex-wrap items-center" }, Pp = { class: "hidden sm:block text-xl leading-6 font-medium text-gray-900 dark:text-gray-50 mr-3" }, jp = { class: "hidden md:inline" }, Bp = { class: "flex pb-1 sm:pb-0" }, Op = ["title"], Hp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("g", {
    "stroke-width": "1.5",
    fill: "none"
  }, [
    /* @__PURE__ */ l("path", {
      d: "M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18",
      stroke: "currentColor"
    })
  ])
], -1), Rp = [
  Hp
], Ep = ["disabled"], Np = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z",
    fill: "currentColor"
  })
], -1), zp = [
  Np
], Up = ["disabled"], qp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z",
    fill: "currentColor"
  })
], -1), Qp = [
  qp
], Kp = ["disabled"], Zp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z",
    fill: "currentColor"
  })
], -1), Wp = [
  Zp
], Gp = ["disabled"], Jp = /* @__PURE__ */ l("svg", {
  class: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z",
    fill: "currentColor"
  })
], -1), Xp = [
  Jp
], Yp = {
  key: 0,
  class: "flex pb-1 sm:pb-0"
}, em = { class: "px-4 text-lg text-black dark:text-white" }, tm = { key: 0 }, sm = { key: 1 }, lm = /* @__PURE__ */ l("span", { class: "hidden xl:inline" }, " Showing Results ", -1), nm = { key: 2 }, om = {
  key: 1,
  class: "pl-2 mt-1"
}, am = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    fill: "currentColor"
  })
], -1), rm = { class: "whitespace-nowrap" }, im = {
  key: 2,
  class: "pl-2"
}, um = /* @__PURE__ */ l("svg", {
  class: "w-5 h-5",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  viewBox: "0 0 24 24"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z"
  })
], -1), dm = [
  um
], cm = { class: "flex pb-1 sm:pb-0" }, fm = {
  key: 0,
  class: "pl-2"
}, vm = /* @__PURE__ */ l("svg", {
  class: "flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  "aria-hidden": "true",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor"
}, [
  /* @__PURE__ */ l("path", {
    "fill-rule": "evenodd",
    d: "M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z",
    "clip-rule": "evenodd"
  })
], -1), pm = { class: "mr-1" }, mm = {
  key: 0,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, hm = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",
  "clip-rule": "evenodd"
}, null, -1), gm = [
  hm
], ym = {
  key: 1,
  class: "h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  fill: "currentColor",
  "aria-hidden": "true"
}, bm = /* @__PURE__ */ l("path", {
  "fill-rule": "evenodd",
  d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z",
  "clip-rule": "evenodd"
}, null, -1), wm = [
  bm
], km = { key: 1 }, _m = { key: 4 }, $m = { key: 0 }, Cm = {
  key: 0,
  class: "cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50"
}, xm = { class: "mr-1 select-none" }, Lm = {
  key: 1,
  class: "flex justify-between items-center"
}, Vm = { class: "mr-1 select-none" }, rn = 25, Mm = /* @__PURE__ */ ue({
  __name: "ModalLookup",
  props: {
    id: { default: "ModalLookup" },
    refInfo: {},
    skip: { default: 0 },
    prefs: {},
    selectedColumns: {},
    allowFiltering: { type: [Boolean, null], default: !0 },
    showPreferences: { type: [Boolean, null], default: !0 },
    showPagingNav: { type: [Boolean, null], default: !0 },
    showPagingInfo: { type: [Boolean, null], default: !0 },
    showResetPreferences: { type: [Boolean, null], default: !0 },
    showFiltersView: { type: [Boolean, null], default: !0 },
    toolbarButtonClass: {},
    canFilter: {},
    type: {},
    modelTitle: {},
    newButtonLabel: {},
    configureField: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const s = e, n = t, a = Ps(), { config: i } = Nt(), { metadataApi: u, filterDefinitions: d } = ut(), c = Je("client"), f = i.value.storage, m = v(() => s.toolbarButtonClass ?? he.toolbarButtonClass), $ = v(() => d.value), k = I({ take: rn }), p = I(new tt()), y = I(s.skip), _ = I(!1), F = I(), H = (B) => typeof B == "string" ? B.split(",") : B || [];
    function ae(B, G) {
      return he.getTableRowClass("fullWidth", G, !1, !0);
    }
    function N() {
      let B = H(s.selectedColumns);
      return B.length > 0 ? B : [];
    }
    const R = v(() => vt(s.refInfo.model)), M = v(() => {
      let G = N().map((je) => je.toLowerCase());
      const ge = ot(R.value);
      return G.length > 0 ? G.map((je) => ge.find((Ze) => Ze.name.toLowerCase() === je)).filter((je) => je != null) : ge;
    }), le = v(() => {
      let B = M.value.map((ge) => ge.name), G = H(k.value.selectedColumns).map((ge) => ge.toLowerCase());
      return G.length > 0 ? B.filter((ge) => G.includes(ge.toLowerCase())) : B;
    }), w = v(() => k.value.take ?? rn), j = v(() => p.value.response ? ke(p.value.response, "results") : []), U = v(() => {
      var B;
      return ((B = p.value.response) == null ? void 0 : B.total) ?? j.value.length ?? 0;
    }), oe = v(() => y.value > 0), A = v(() => y.value > 0), K = v(() => j.value.length >= w.value), W = v(() => j.value.length >= w.value), q = I([]), S = v(() => q.value.some((B) => B.settings.filters.length > 0 || !!B.settings.sort)), se = v(() => q.value.map((B) => B.settings.filters.length).reduce((B, G) => B + G, 0)), b = v(() => ss(R.value)), D = v(() => {
      var B;
      return (B = u.value) == null ? void 0 : B.operations.find((G) => {
        var ge;
        return ((ge = G.dataModel) == null ? void 0 : ge.name) == s.refInfo.model && We.isAnyQuery(G);
      });
    }), E = I(), h = I(!1), x = I(), Y = v(() => zt(s.refInfo.model)), ee = v(() => Ht.forType(Y.value, u.value)), re = v(() => {
      var B;
      return Y.value || ((B = D.value) == null ? void 0 : B.dataModel.name);
    }), P = v(() => s.modelTitle || re.value), V = v(() => s.newButtonLabel || `New ${P.value}`), de = v(() => ds(ee.value.Create)), ce = I(), fe = I(!1);
    function pe() {
      fe.value = !0;
    }
    function te() {
      fe.value = !1;
    }
    async function Z(B) {
      te(), n("done", B);
    }
    function me(B) {
      var G;
      ce.value && (Object.assign((G = ce.value) == null ? void 0 : G.model, B), console.log("setCreate", JSON.stringify(B, null, 2)), Ce());
    }
    function Ce() {
      var G, ge;
      (G = ce.value) == null || G.forceUpdate();
      const B = He();
      (ge = B == null ? void 0 : B.proxy) == null || ge.$forceUpdate();
    }
    const Ae = () => `${s.id}/ApiPrefs/${s.refInfo.model}`, ye = (B) => `Column/${s.id}:${s.refInfo.model}.${B}`;
    async function Oe(B) {
      y.value += B, y.value < 0 && (y.value = 0);
      var G = Math.floor(U.value / w.value) * w.value;
      y.value > G && (y.value = G), await Fe();
    }
    async function De(B, G) {
      n("done", B);
    }
    function Be() {
      n("done", null);
    }
    function qe(B, G) {
      var je, Ze, dt;
      let ge = G.target;
      if ((ge == null ? void 0 : ge.tagName) !== "TD") {
        let bt = (je = ge == null ? void 0 : ge.closest("TABLE")) == null ? void 0 : je.getBoundingClientRect(), $t = q.value.find((Ve) => Ve.name.toLowerCase() == B.toLowerCase());
        if ($t && bt) {
          let Ve = 318, Ut = (((Ze = G.target) == null ? void 0 : Ze.tagName) === "DIV" ? G.target : (dt = G.target) == null ? void 0 : dt.closest("DIV")).getBoundingClientRect(), qt = Ve + 25;
          x.value = {
            column: $t,
            topLeft: {
              x: Math.max(Math.floor(Ut.x + 25), qt),
              y: Math.floor(115)
            }
          };
        }
      }
    }
    function Pe() {
      x.value = null;
    }
    async function Qe(B) {
      var ge;
      let G = (ge = x.value) == null ? void 0 : ge.column;
      G && (G.settings = B, f.setItem(ye(G.name), JSON.stringify(G.settings)), await Fe()), x.value = null;
    }
    async function st(B) {
      f.setItem(ye(B.name), JSON.stringify(B.settings)), await Fe();
    }
    async function lt(B) {
      h.value = !1, k.value = B, f.setItem(Ae(), JSON.stringify(B)), await Fe();
    }
    async function Fe() {
      await Xe(yt());
    }
    async function Xe(B) {
      const G = D.value;
      if (!G) {
        console.error(`No Query API was found for ${s.refInfo.model}`);
        return;
      }
      let ge = cs(G, B), je = pn((bt) => {
        p.value.response = p.value.error = void 0, _.value = bt;
      }), Ze = await c.api(ge);
      je(), jt(() => p.value = Ze);
      let dt = ke(Ze.response, "results") || [];
      !Ze.succeeded || dt.label == 0;
    }
    function yt() {
      let B = {
        include: "total",
        take: w.value
      }, G = H(k.value.selectedColumns || s.selectedColumns);
      if (G.length > 0) {
        let je = b.value;
        je && G.includes(je.name) && (G = [je.name, ...G]), B.fields = G.join(",");
      }
      let ge = [];
      return q.value.forEach((je) => {
        je.settings.sort && ge.push((je.settings.sort === "DESC" ? "-" : "") + je.name), je.settings.filters.forEach((Ze) => {
          let dt = Ze.key.replace("%", je.name);
          B[dt] = Ze.value;
        });
      }), typeof B.skip > "u" && y.value > 0 && (B.skip = y.value), ge.length > 0 && (B.orderBy = ge.join(",")), B;
    }
    async function Ke() {
      q.value.forEach((B) => {
        B.settings = { filters: [] }, f.removeItem(ye(B.name));
      }), await Fe();
    }
    return at(async () => {
      const B = s.prefs || Ts(f.getItem(Ae()));
      B && (k.value = B), q.value = M.value.map((G) => ({
        name: G.name,
        type: G.type,
        meta: G,
        settings: Object.assign(
          {
            filters: []
          },
          Ts(f.getItem(ye(G.name)))
        )
      })), isNaN(s.skip) || (y.value = s.skip), await Fe();
    }), (B, G) => {
      const ge = Q("AutoCreateForm"), je = Q("ErrorSummary"), Ze = Q("Loading"), dt = Q("SettingsIcons"), bt = Q("DataGrid"), $t = Q("ModalDialog");
      return o(), r(Me, null, [
        B.refInfo ? (o(), ne($t, {
          key: 0,
          ref_key: "modalDialog",
          ref: E,
          id: B.id,
          onDone: Be
        }, {
          default: $e(() => [
            l("div", Ip, [
              l("div", Dp, [
                l("h3", Pp, [
                  _e(" Select "),
                  l("span", jp, T(J(Re)(B.refInfo.model)), 1)
                ]),
                l("div", Bp, [
                  B.showPreferences ? (o(), r("button", {
                    key: 0,
                    type: "button",
                    class: "pl-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400",
                    title: `${B.refInfo.model} Preferences`,
                    onClick: G[0] || (G[0] = (Ve) => h.value = !h.value)
                  }, Rp, 8, Op)) : L("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 1,
                    type: "button",
                    class: g(["pl-2", oe.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "First page",
                    disabled: !oe.value,
                    onClick: G[1] || (G[1] = (Ve) => Oe(-U.value))
                  }, zp, 10, Ep)) : L("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 2,
                    type: "button",
                    class: g(["pl-2", A.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Previous page",
                    disabled: !A.value,
                    onClick: G[2] || (G[2] = (Ve) => Oe(-w.value))
                  }, Qp, 10, Up)) : L("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 3,
                    type: "button",
                    class: g(["pl-2", K.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Next page",
                    disabled: !K.value,
                    onClick: G[3] || (G[3] = (Ve) => Oe(w.value))
                  }, Wp, 10, Kp)) : L("", !0),
                  B.showPagingNav ? (o(), r("button", {
                    key: 4,
                    type: "button",
                    class: g(["pl-2", W.value ? "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400" : "text-gray-400 dark:text-gray-500"]),
                    title: "Last page",
                    disabled: !W.value,
                    onClick: G[4] || (G[4] = (Ve) => Oe(U.value))
                  }, Xp, 10, Gp)) : L("", !0)
                ]),
                B.showPagingInfo ? (o(), r("div", Yp, [
                  l("div", em, [
                    _.value ? (o(), r("span", tm, "Querying...")) : L("", !0),
                    j.value.length ? (o(), r("span", sm, [
                      lm,
                      _e(" " + T(y.value + 1) + " - " + T(Math.min(y.value + j.value.length, U.value)) + " ", 1),
                      l("span", null, " of " + T(U.value), 1)
                    ])) : p.value.completed ? (o(), r("span", nm, "No Results")) : L("", !0)
                  ])
                ])) : L("", !0),
                ee.value.Create && de.value ? (o(), r("div", om, [
                  l("button", {
                    type: "button",
                    onClick: G[5] || (G[5] = (Ve) => pe()),
                    title: "modelTitle",
                    class: g(J(he).toolbarButtonClass)
                  }, [
                    am,
                    l("span", rm, T(V.value), 1)
                  ], 2),
                  fe.value ? (o(), ne(ge, {
                    key: 0,
                    ref_key: "createForm",
                    ref: ce,
                    type: ee.value.Create.request.name,
                    configure: B.configureField,
                    onDone: te,
                    onSave: Z
                  }, {
                    header: $e(() => [
                      z(B.$slots, "formheader", {
                        form: "create",
                        formInstance: ce.value,
                        apis: ee.value,
                        type: re.value,
                        updateModel: me
                      })
                    ]),
                    footer: $e(() => [
                      z(B.$slots, "formfooter", {
                        form: "create",
                        formInstance: ce.value,
                        apis: ee.value,
                        type: re.value,
                        updateModel: me
                      })
                    ]),
                    _: 3
                  }, 8, ["type", "configure"])) : L("", !0)
                ])) : L("", !0),
                S.value && B.showResetPreferences ? (o(), r("div", im, [
                  l("button", {
                    type: "button",
                    onClick: Ke,
                    title: "Reset Preferences & Filters",
                    class: g(m.value)
                  }, dm, 2)
                ])) : L("", !0),
                l("div", cm, [
                  B.showFiltersView && se.value > 0 ? (o(), r("div", fm, [
                    l("button", {
                      type: "button",
                      onClick: G[6] || (G[6] = (Ve) => F.value = F.value == "filters" ? null : "filters"),
                      class: g(m.value),
                      "aria-expanded": "false"
                    }, [
                      vm,
                      l("span", pm, T(se.value) + " " + T(se.value == 1 ? "Filter" : "Filters"), 1),
                      F.value != "filters" ? (o(), r("svg", mm, gm)) : (o(), r("svg", ym, wm))
                    ], 2)
                  ])) : L("", !0)
                ])
              ]),
              F.value == "filters" ? (o(), ne(Rl, {
                key: 0,
                class: "border-y border-gray-200 dark:border-gray-800 py-8 my-2",
                definitions: $.value,
                columns: q.value,
                onDone: G[7] || (G[7] = (Ve) => F.value = null),
                onChange: st
              }, null, 8, ["definitions", "columns"])) : L("", !0),
              x.value ? (o(), r("div", km, [
                we(Hl, {
                  definitions: $.value,
                  column: x.value.column,
                  "top-left": x.value.topLeft,
                  onDone: Pe,
                  onSave: Qe
                }, null, 8, ["definitions", "column", "top-left"])
              ])) : L("", !0),
              p.value.error ? (o(), ne(je, {
                key: 2,
                status: p.value.error
              }, null, 8, ["status"])) : _.value ? (o(), ne(Ze, { key: 3 })) : (o(), r("div", _m, [
                j.value.length ? (o(), r("div", $m, [
                  we(bt, {
                    id: B.id,
                    items: j.value,
                    type: B.refInfo.model,
                    "selected-columns": le.value,
                    onFiltersChanged: Fe,
                    tableStyle: "fullWidth",
                    rowClass: ae,
                    onRowSelected: De,
                    onHeaderSelected: qe
                  }, ml({
                    header: $e(({ column: Ve, label: Vt }) => {
                      var Ut;
                      return [
                        B.allowFiltering && (!s.canFilter || s.canFilter(Ve)) ? (o(), r("div", Cm, [
                          l("span", xm, T(Vt), 1),
                          we(dt, {
                            column: q.value.find((qt) => qt.name.toLowerCase() === Ve.toLowerCase()),
                            "is-open": ((Ut = x.value) == null ? void 0 : Ut.column.name) === Ve
                          }, null, 8, ["column", "is-open"])
                        ])) : (o(), r("div", Lm, [
                          l("span", Vm, T(Vt), 1)
                        ]))
                      ];
                    }),
                    _: 2
                  }, [
                    Ie(Object.keys(J(a)), (Ve) => ({
                      name: Ve,
                      fn: $e((Vt) => [
                        z(B.$slots, Ve, Xt(As(Vt)))
                      ])
                    }))
                  ]), 1032, ["id", "items", "type", "selected-columns"])
                ])) : L("", !0)
              ]))
            ])
          ]),
          _: 3
        }, 8, ["id"])) : L("", !0),
        h.value ? (o(), ne(El, {
          key: 1,
          columns: M.value,
          prefs: k.value,
          onDone: G[8] || (G[8] = (Ve) => h.value = !1),
          onSave: lt
        }, null, 8, ["columns", "prefs"])) : L("", !0)
      ], 64);
    };
  }
}), Sm = { class: "sm:hidden" }, Am = ["for"], Fm = ["id", "name"], Tm = ["value"], Im = { class: "hidden sm:block" }, Dm = { class: "border-b border-gray-200" }, Pm = {
  class: "-mb-px flex",
  "aria-label": "Tabs"
}, jm = ["onClick"], Bm = /* @__PURE__ */ ue({
  __name: "Tabs",
  props: {
    tabs: {},
    id: { default: "tabs" },
    param: { default: "tab" },
    label: { type: Function, default: (e) => Re(e) },
    selected: {},
    tabClass: {},
    bodyClass: { default: "p-4" },
    url: { type: Boolean, default: !0 },
    clearQuery: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, s = v(() => Object.keys(t.tabs)), n = (m) => t.label ? t.label(m) : Re(m), a = v(() => t.id || "tabs"), i = v(() => t.param || "tab"), u = I();
    function d(m) {
      if (u.value = m, t.url) {
        const $ = s.value[0];
        Il({ tab: m === $ ? void 0 : m }, t.clearQuery);
      }
    }
    function c(m) {
      return u.value === m;
    }
    const f = v(() => `${100 / Object.keys(t.tabs).length}%`);
    return at(() => {
      if (u.value = t.selected || Object.keys(t.tabs)[0], t.url) {
        const m = location.search ? location.search : location.hash.includes("?") ? "?" + xs(location.hash, "?") : "", k = ll(m)[i.value];
        k && (u.value = k);
      }
    }), (m, $) => (o(), r("div", null, [
      l("div", Sm, [
        l("label", {
          for: a.value,
          class: "sr-only"
        }, "Select a tab", 8, Am),
        l("select", {
          id: a.value,
          name: a.value,
          class: "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
          onChange: $[0] || ($[0] = (k) => {
            var p;
            return d((p = k.target) == null ? void 0 : p.value);
          })
        }, [
          (o(!0), r(Me, null, Ie(s.value, (k) => (o(), r("option", {
            key: k,
            value: k
          }, T(n(k)), 9, Tm))), 128))
        ], 40, Fm)
      ]),
      l("div", Im, [
        l("div", Dm, [
          l("nav", Pm, [
            (o(!0), r(Me, null, Ie(s.value, (k) => (o(), r("a", {
              href: "#",
              onClick: Ue((p) => d(k), ["prevent"]),
              style: vl({ width: f.value }),
              class: g([c(k) ? "border-indigo-500 text-indigo-600 py-4 px-1 text-center border-b-2 font-medium text-sm" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm", m.tabClass])
            }, T(n(k)), 15, jm))), 256))
          ])
        ])
      ]),
      l("div", {
        class: g(m.bodyClass)
      }, [
        (o(), ne(cn(m.tabs[u.value])))
      ], 2)
    ]));
  }
}), Om = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4 text-gray-400",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"
  })
], -1), Hm = [
  Om
], Rm = /* @__PURE__ */ l("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-4 w-4 text-indigo-600",
  preserveAspectRatio: "xMidYMid meet",
  viewBox: "0 0 32 32"
}, [
  /* @__PURE__ */ l("path", {
    fill: "currentColor",
    d: "M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6ZM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"
  })
], -1), Em = [
  Rm
], Nm = /* @__PURE__ */ ue({
  __name: "DarkModeToggle",
  setup(e) {
    const t = typeof document < "u" ? document.documentElement : null, s = () => !!(t != null && t.classList.contains("dark")), n = I(localStorage.getItem("color-scheme") == "dark");
    function a() {
      s() ? t == null || t.classList.remove("dark") : t == null || t.classList.add("dark"), n.value = s(), localStorage.setItem("color-scheme", n.value ? "dark" : "light");
    }
    return (i, u) => (o(), r("button", {
      type: "button",
      class: "bg-gray-200 dark:bg-gray-700 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black",
      role: "switch",
      "aria-checked": "false",
      onClick: u[0] || (u[0] = (d) => a())
    }, [
      l("span", {
        class: g(`${n.value ? "translate-x-0" : "translate-x-5"} pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white dark:bg-black shadow transform ring-0 transition ease-in-out duration-200`)
      }, [
        l("span", {
          class: g(`${n.value ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, Hm, 2),
        l("span", {
          class: g(`${n.value ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200"} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`),
          "aria-hidden": "true"
        }, Em, 2)
      ], 2)
    ]));
  }
}), zm = { key: 0 }, Um = {
  key: 1,
  class: "min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8"
}, qm = { class: "sm:mx-auto sm:w-full sm:max-w-md" }, Qm = { class: "mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50" }, Km = {
  key: 0,
  class: "mt-4 text-center text-sm text-gray-600 dark:text-gray-300"
}, Zm = { class: "relative z-0 inline-flex shadow-sm rounded-md" }, Wm = ["onClick"], Gm = { class: "mt-8 sm:mx-auto sm:w-full sm:max-w-md" }, Jm = { class: "bg-white dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10" }, Xm = { class: "mt-8" }, Ym = {
  key: 1,
  class: "mt-6"
}, e1 = /* @__PURE__ */ Ds('<div class="relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300 dark:border-gray-600"></div></div><div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500 dark:text-gray-400"> Or continue with </span></div></div>', 1), t1 = { class: "mt-6 grid grid-cols-3 gap-3" }, s1 = ["href", "title"], l1 = {
  key: 1,
  class: "h-5 w-5 text-gray-700 dark:text-gray-200",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32"
}, n1 = /* @__PURE__ */ l("path", {
  d: "M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z",
  fill: "currentColor"
}, null, -1), o1 = /* @__PURE__ */ l("path", {
  d: "M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z",
  fill: "currentColor"
}, null, -1), a1 = [
  n1,
  o1
], r1 = /* @__PURE__ */ ue({
  __name: "SignIn",
  props: {
    provider: {},
    title: { default: "Sign In" },
    tabs: { type: [Boolean, String], default: !0 },
    oauth: { type: [Boolean, String], default: !0 }
  },
  emits: ["login"],
  setup(e, { emit: t }) {
    const s = e, n = t, { getMetadata: a, createDto: i } = ut(), u = ys(), d = Je("client"), { signIn: c } = Ol(), f = a({ assert: !0 }), m = f.plugins.auth, $ = document.baseURI, k = f.app.baseUrl, p = I(i("Authenticate")), y = I(new tt()), _ = I(s.provider);
    at(() => {
      m == null || m.authProviders.map((A) => A.formLayout).filter((A) => A).forEach((A) => A.forEach(
        (K) => p.value[K.id] = K.type === "checkbox" ? !1 : ""
      ));
    });
    const F = v(() => (m == null ? void 0 : m.authProviders.filter((A) => A.formLayout)) || []), H = v(() => F.value[0] || {}), ae = v(() => F.value[Math.max(F.value.length - 1, 0)] || {}), N = v(() => (_.value ? m == null ? void 0 : m.authProviders.find((A) => A.name === _.value) : null) ?? H.value), R = (A) => A === !1 || A === "false";
    function M(A) {
      return A.label || A.navItem && A.navItem.label;
    }
    const le = v(() => {
      var A;
      return (((A = N.value) == null ? void 0 : A.formLayout) || []).map((K) => {
        var W, q;
        return Object.assign({}, K, {
          type: (W = K.type) == null ? void 0 : W.toLowerCase(),
          autocomplete: K.autocomplete || (((q = K.type) == null ? void 0 : q.toLowerCase()) === "password" ? "current-password" : void 0) || (K.id.toLowerCase() === "username" ? "username" : void 0),
          css: Object.assign({ field: "col-span-12" }, K.css)
        });
      });
    }), w = v(() => R(s.oauth) ? [] : (m == null ? void 0 : m.authProviders.filter((A) => A.type === "oauth")) || []), j = v(() => {
      let A = Ho(
        m == null ? void 0 : m.authProviders.filter((W) => W.formLayout && W.formLayout.length > 0),
        (W, q) => {
          let S = M(q) || ft(q.name);
          W[S] = q.name === H.value.name ? "" : q.name;
        }
      );
      const K = N.value;
      return K && R(s.tabs) && (A = { [M(K) || ft(K.name)]: K }), A;
    }), U = v(() => {
      let A = le.value.map((K) => K.id).filter((K) => K);
      return y.value.summaryMessage(A);
    });
    async function oe() {
      if (p.value.provider = N.value.name, N.value.name === "authsecret" ? (d.headers.set("authsecret", p.value.authsecret), p.value = i("Authenticate")) : N.value.name === "basic" ? (d.setCredentials(p.value.UserName, p.value.Password), p.value = i("Authenticate"), p.value.UserName = null, p.value.Password = null) : (N.value.type === "Bearer" || N.value.name === "jwt") && (d.bearerToken = p.value.BearerToken, p.value = i("Authenticate")), y.value = await u.api(p.value), y.value.succeeded) {
        const A = y.value.response;
        c(A), n("login", A), y.value = new tt(), p.value = i("Authenticate");
      }
    }
    return (A, K) => {
      const W = Q("ErrorSummary"), q = Q("AutoFormFields"), S = Q("PrimaryButton"), se = Q("Icon"), b = _o("href");
      return J(m) ? (o(), r("div", Um, [
        l("div", qm, [
          l("h2", Qm, T(A.title), 1),
          Object.keys(j.value).length > 1 ? (o(), r("p", Km, [
            l("span", Zm, [
              (o(!0), r(Me, null, Ie(j.value, (D, E) => Bt((o(), r("a", {
                onClick: (h) => _.value = D,
                class: g([
                  D === "" || D === H.value.name ? "rounded-l-md" : D === ae.value.name ? "rounded-r-md -ml-px" : "-ml-px",
                  _.value === D ? "z-10 outline-none ring-1 ring-indigo-500 border-indigo-500" : "",
                  "cursor-pointer relative inline-flex items-center px-4 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                ])
              }, [
                _e(T(E), 1)
              ], 10, Wm)), [
                [b, { provider: D }]
              ])), 256))
            ])
          ])) : L("", !0)
        ]),
        l("div", Gm, [
          U.value ? (o(), ne(W, {
            key: 0,
            class: "mb-3",
            errorSummary: U.value
          }, null, 8, ["errorSummary"])) : L("", !0),
          l("div", Jm, [
            le.value.length ? (o(), r("form", {
              key: 0,
              onSubmit: Ue(oe, ["prevent"])
            }, [
              we(q, {
                modelValue: p.value,
                formLayout: le.value,
                api: y.value,
                hideSummary: !0,
                "divide-class": "",
                "space-class": "space-y-6"
              }, null, 8, ["modelValue", "formLayout", "api"]),
              l("div", Xm, [
                we(S, { class: "w-full" }, {
                  default: $e(() => [
                    _e("Sign In")
                  ]),
                  _: 1
                })
              ])
            ], 32)) : L("", !0),
            w.value.length ? (o(), r("div", Ym, [
              e1,
              l("div", t1, [
                (o(!0), r(Me, null, Ie(w.value, (D) => (o(), r("div", null, [
                  l("a", {
                    href: J(k) + D.navItem.href + "?continue=" + J($),
                    title: M(D),
                    class: "w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-black text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                  }, [
                    D.icon ? (o(), ne(se, {
                      key: 0,
                      image: D.icon,
                      class: "h-5 w-5 text-gray-700 dark:text-gray-200"
                    }, null, 8, ["image"])) : (o(), r("svg", l1, a1))
                  ], 8, s1)
                ]))), 256))
              ])
            ])) : L("", !0)
          ])
        ])
      ])) : (o(), r("div", zm, "No Auth Plugin"));
    };
  }
}), i1 = ["for"], u1 = {
  key: 1,
  class: "border border-gray-200 flex justify-between"
}, d1 = { class: "p-2 flex flex-wrap gap-x-4" }, c1 = /* @__PURE__ */ l("title", null, "Bold text (CTRL+B)", -1), f1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
}, null, -1), v1 = [
  c1,
  f1
], p1 = /* @__PURE__ */ l("title", null, "Italics (CTRL+I)", -1), m1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"
}, null, -1), h1 = [
  p1,
  m1
], g1 = /* @__PURE__ */ l("title", null, "Insert Link (CTRL+K)", -1), y1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z"
}, null, -1), b1 = [
  g1,
  y1
], w1 = /* @__PURE__ */ l("title", null, "Blockquote (CTRL+Q)", -1), k1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m15 17l2-4h-4V6h7v7l-2 4h-3Zm-9 0l2-4H4V6h7v7l-2 4H6Z"
}, null, -1), _1 = [
  w1,
  k1
], $1 = /* @__PURE__ */ l("title", null, "Insert Image (CTRL+SHIFT+L)", -1), C1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992ZM20 15V5H4v14L14 9l6 6Zm0 2.828l-6-6L6.828 19H20v-1.172ZM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z"
}, null, -1), x1 = [
  $1,
  C1
], L1 = /* @__PURE__ */ l("title", null, "Insert Code (CTRL+<)", -1), V1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z"
}, null, -1), M1 = [
  L1,
  V1
], S1 = /* @__PURE__ */ l("title", null, "H2 Heading (CTRL+H)", -1), A1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M7 20V7H2V4h13v3h-5v13H7Zm9 0v-8h-3V9h9v3h-3v8h-3Z"
}, null, -1), F1 = [
  S1,
  A1
], T1 = /* @__PURE__ */ l("title", null, "Numbered List (ALT+1)", -1), I1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M3 22v-1.5h2.5v-.75H4v-1.5h1.5v-.75H3V16h3q.425 0 .713.288T7 17v1q0 .425-.288.713T6 19q.425 0 .713.288T7 20v1q0 .425-.288.713T6 22H3Zm0-7v-2.75q0-.425.288-.713T4 11.25h1.5v-.75H3V9h3q.425 0 .713.288T7 10v1.75q0 .425-.288.713T6 12.75H4.5v.75H7V15H3Zm1.5-7V3.5H3V2h3v6H4.5ZM9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9Z"
}, null, -1), D1 = [
  T1,
  I1
], P1 = /* @__PURE__ */ l("title", null, "Bulleted List (ALT+-)", -1), j1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9ZM5 20q-.825 0-1.413-.588T3 18q0-.825.588-1.413T5 16q.825 0 1.413.588T7 18q0 .825-.588 1.413T5 20Zm0-6q-.825 0-1.413-.588T3 12q0-.825.588-1.413T5 10q.825 0 1.413.588T7 12q0 .825-.588 1.413T5 14Zm0-6q-.825 0-1.413-.588T3 6q0-.825.588-1.413T5 4q.825 0 1.413.588T7 6q0 .825-.588 1.413T5 8Z"
}, null, -1), B1 = [
  P1,
  j1
], O1 = /* @__PURE__ */ l("title", null, "Strike Through (ALT+S)", -1), H1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"
}, null, -1), R1 = [
  O1,
  H1
], E1 = /* @__PURE__ */ l("title", null, "Undo (CTRL+Z)", -1), N1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"
}, null, -1), z1 = [
  E1,
  N1
], U1 = /* @__PURE__ */ l("title", null, "Redo (CTRL+SHIFT+Z)", -1), q1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"
}, null, -1), Q1 = [
  U1,
  q1
], K1 = {
  key: 0,
  class: "p-2 flex flex-wrap gap-x-4"
}, Z1 = ["href"], W1 = /* @__PURE__ */ l("path", {
  fill: "currentColor",
  d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5c0-2.21-1.79-4-4-4z"
}, null, -1), G1 = [
  W1
], J1 = { class: "" }, X1 = ["name", "id", "label", "value", "rows", "disabled"], Y1 = ["id"], eh = ["id"], nt = "w-5 h-5 cursor-pointer select-none text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400", th = /* @__PURE__ */ ue({
  __name: "MarkdownInput",
  props: {
    status: {},
    id: {},
    inputClass: {},
    label: {},
    labelClass: {},
    help: {},
    placeholder: {},
    modelValue: {},
    counter: { type: Boolean },
    rows: {},
    errorMessages: {},
    lang: {},
    autoFocus: { type: Boolean },
    disabled: { type: Boolean },
    helpUrl: { default: "https://guides.github.com/features/mastering-markdown/" },
    hide: {}
  },
  emits: ["update:modelValue", "close"],
  setup(e, { expose: t, emit: s }) {
    const n = e, a = s;
    let i = [], u = [], d = Je("ApiState", void 0);
    const c = v(() => _t.call({ responseStatus: n.status ?? (d == null ? void 0 : d.error.value) }, n.id)), f = v(() => n.label ?? Re(ft(n.id))), m = "bold,italics,link,image,blockquote,code,heading,orderedList,unorderedList,strikethrough,undo,redo,help".split(","), $ = v(() => n.hide ? Pt(m, n.hide) : Pt(m, []));
    function k(h) {
      return $.value[h];
    }
    const p = v(() => ["shadow-sm font-mono" + ct.base.replace("rounded-md", ""), c.value ? "text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300" : "text-gray-900 " + ct.valid, n.inputClass]), y = I();
    t({ props: n, textarea: y, updateModelValue: _, selection: H, hasSelection: F, selectionInfo: ae, insert: R, replace: N });
    function _(h) {
      a("update:modelValue", h);
    }
    function F() {
      return y.value.selectionStart !== y.value.selectionEnd;
    }
    function H() {
      const h = y.value;
      return h.value.substring(h.selectionStart, h.selectionEnd) || "";
    }
    function ae() {
      const h = y.value, x = h.value, Y = h.selectionStart, ee = x.substring(Y, h.selectionEnd) || "", re = x.substring(0, Y), P = re.lastIndexOf(`
`);
      return {
        value: x,
        sel: ee,
        selPos: Y,
        beforeSel: re,
        afterSel: x.substring(Y),
        prevCRPos: P,
        beforeCR: P >= 0 ? re.substring(0, P + 1) : "",
        afterCR: P >= 0 ? re.substring(P + 1) : ""
      };
    }
    function N({ value: h, selectionStart: x, selectionEnd: Y }) {
      Y == null && (Y = x), _(h), jt(() => {
        y.value.focus(), y.value.setSelectionRange(x, Y);
      });
    }
    function R(h, x, Y = "", { selectionAtEnd: ee, offsetStart: re, offsetEnd: P, filterValue: V, filterSelection: de } = {}) {
      const ce = y.value;
      let fe = ce.value, pe = ce.selectionEnd;
      i.push({ value: fe, selectionStart: ce.selectionStart, selectionEnd: ce.selectionEnd }), u = [];
      const te = ce.selectionStart, Z = ce.selectionEnd;
      let me = fe.substring(0, te), Ce = fe.substring(Z);
      const Ae = h && me.endsWith(h) && Ce.startsWith(x);
      if (te == Z) {
        if (Ae ? (fe = me.substring(0, me.length - h.length) + Ce.substring(x.length), pe += -x.length) : (fe = me + h + Y + x + Ce, pe += h.length, re = 0, P = (Y == null ? void 0 : Y.length) || 0, ee && (pe += P, P = 0)), V) {
          var Oe = { pos: pe };
          fe = V(fe, Oe), pe = Oe.pos;
        }
      } else {
        var De = fe.substring(te, Z);
        de && (De = de(De)), Ae ? (fe = me.substring(0, me.length - h.length) + De + Ce.substring(x.length), re = -De.length - h.length, P = De.length) : (fe = me + h + De + x + Ce, re ? pe += (h + x).length : (pe = te, re = h.length, P = De.length));
      }
      _(fe), jt(() => {
        ce.focus(), re = pe + (re || 0), P = (re || 0) + (P || 0), ce.setSelectionRange(re, P);
      });
    }
    const M = () => R("**", "**", "bold"), le = () => R("_", "_", "italics"), w = () => R("~~", "~~", "strikethrough"), j = () => R("[", "](https://)", "", { offsetStart: -9, offsetEnd: 8 }), U = () => R(`
> `, `
`, "Blockquote", {}), oe = () => R("![](", ")");
    function A(h) {
      const x = H();
      if (x && !h.shiftKey)
        R("`", "`", "code");
      else {
        const Y = n.lang || "js";
        x.indexOf(`
`) === -1 ? R("\n```" + Y + `
`, "\n```\n", "// code") : R("```" + Y + `
`, "```\n", "");
      }
    }
    function K() {
      if (F()) {
        let { sel: h, selPos: x, beforeSel: Y, afterSel: ee, prevCRPos: re, beforeCR: P, afterCR: V } = ae();
        if (h.indexOf(`
`) === -1)
          R(`
 1. `, `
`);
        else if (!h.startsWith(" 1. ")) {
          let fe = 1;
          R("", "", " - ", {
            selectionAtEnd: !0,
            filterSelection: (pe) => " 1. " + pe.replace(/\n$/, "").replace(/\n/g, (te) => `
 ${++fe}. `) + `
`
          });
        } else
          R("", "", "", {
            filterValue: (fe, pe) => {
              if (re >= 0) {
                let te = V.replace(/^ - /, "");
                Y = P + te, pe.pos -= V.length - te.length;
              }
              return Y + ee;
            },
            filterSelection: (fe) => fe.replace(/^ 1. /g, "").replace(/\n \d+. /g, `
`)
          });
      } else
        R(`
 1. `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function W() {
      if (F()) {
        let { sel: h, selPos: x, beforeSel: Y, afterSel: ee, prevCRPos: re, beforeCR: P, afterCR: V } = ae();
        h.indexOf(`
`) === -1 ? R(`
 - `, `
`) : !h.startsWith(" - ") ? R("", "", " - ", {
          selectionAtEnd: !0,
          filterSelection: (fe) => " - " + fe.replace(/\n$/, "").replace(/\n/g, `
 - `) + `
`
        }) : R("", "", "", {
          filterValue: (fe, pe) => {
            if (re >= 0) {
              let te = V.replace(/^ - /, "");
              Y = P + te, pe.pos -= V.length - te.length;
            }
            return Y + ee;
          },
          filterSelection: (fe) => fe.replace(/^ - /g, "").replace(/\n - /g, `
`)
        });
      } else
        R(`
 - `, `
`, "List Item", { offsetStart: -10, offsetEnd: 9 });
    }
    function q() {
      const h = H(), x = h.indexOf(`
`) === -1;
      h ? x ? R(`
## `, `
`, "") : R("## ", "", "") : R(`
## `, `
`, "Heading", { offsetStart: -8, offsetEnd: 7 });
    }
    function S() {
      let { sel: h, selPos: x, beforeSel: Y, afterSel: ee, prevCRPos: re, beforeCR: P, afterCR: V } = ae();
      !h.startsWith("//") && !V.startsWith("//") ? h ? R("", "", "//", {
        selectionAtEnd: !0,
        filterSelection: (ce) => "//" + ce.replace(/\n$/, "").replace(/\n/g, `
//`) + `
`
      }) : N({
        value: P + "//" + V + ee,
        selectionStart: x + 2
      }) : R("", "", "", {
        filterValue: (ce, fe) => {
          if (re >= 0) {
            let pe = V.replace(/^\/\//, "");
            Y = P + pe, fe.pos -= V.length - pe.length;
          }
          return Y + ee;
        },
        filterSelection: (ce) => ce.replace(/^\/\//g, "").replace(/\n\/\//g, `
`)
      });
    }
    const se = () => R(`/*
`, `*/
`, "");
    function b() {
      if (i.length === 0)
        return !1;
      const h = y.value, x = i.pop();
      return u.push({ value: h.value, selectionStart: h.selectionStart, selectionEnd: h.selectionEnd }), N(x), !0;
    }
    function D() {
      if (u.length === 0)
        return !1;
      const h = y.value, x = u.pop();
      return i.push({ value: h.value, selectionStart: h.selectionStart, selectionEnd: h.selectionEnd }), N(x), !0;
    }
    const E = () => null;
    return at(() => {
      i = [], u = [];
      const h = y.value;
      h.onkeydown = (x) => {
        if (x.key === "Escape" || x.keyCode === 27) {
          a("close");
          return;
        }
        const Y = String.fromCharCode(x.keyCode).toLowerCase();
        Y === "	" ? (!x.shiftKey ? R("", "", "    ", {
          selectionAtEnd: !0,
          filterSelection: (re) => "    " + re.replace(/\n$/, "").replace(/\n/g, `
    `) + `
`
        }) : R("", "", "", {
          filterValue: (re, P) => {
            let { selPos: V, beforeSel: de, afterSel: ce, prevCRPos: fe, beforeCR: pe, afterCR: te } = ae();
            if (fe >= 0) {
              let Z = te.replace(/\t/g, "    ").replace(/^ ? ? ? ?/, "");
              de = pe + Z, P.pos -= te.length - Z.length;
            }
            return de + ce;
          },
          filterSelection: (re) => re.replace(/\t/g, "    ").replace(/^ ? ? ? ?/g, "").replace(/\n    /g, `
`)
        }), x.preventDefault()) : x.ctrlKey ? Y === "z" ? x.shiftKey ? D() && x.preventDefault() : b() && x.preventDefault() : Y === "b" && !x.shiftKey ? (M(), x.preventDefault()) : Y === "h" && !x.shiftKey ? (q(), x.preventDefault()) : Y === "i" && !x.shiftKey ? (le(), x.preventDefault()) : Y === "q" && !x.shiftKey ? (U(), x.preventDefault()) : Y === "k" ? x.shiftKey ? (oe(), x.preventDefault()) : (j(), x.preventDefault()) : Y === "," || x.key === "<" || x.key === ">" || x.keyCode === 188 ? (A(x), x.preventDefault()) : Y === "/" || x.key === "/" ? (S(), x.preventDefault()) : (Y === "?" || x.key === "?") && x.shiftKey && (se(), x.preventDefault()) : x.altKey && (x.key === "1" || x.key === "0" ? (K(), x.preventDefault()) : x.key === "-" ? (W(), x.preventDefault()) : x.key === "s" && (w(), x.preventDefault()));
      };
    }), (h, x) => {
      var Y;
      return o(), r("div", null, [
        z(h.$slots, "header", Se({
          inputElement: y.value,
          id: h.id,
          modelValue: h.modelValue,
          status: h.status
        }, h.$attrs)),
        f.value ? (o(), r("label", {
          key: 0,
          for: h.id,
          class: g(`mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 ${h.labelClass ?? ""}`)
        }, T(f.value), 11, i1)) : L("", !0),
        h.disabled ? L("", !0) : (o(), r("div", u1, [
          l("div", d1, [
            k("bold") ? (o(), r("svg", {
              key: 0,
              class: g(nt),
              onClick: M,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, v1)) : L("", !0),
            k("italics") ? (o(), r("svg", {
              key: 1,
              class: g(nt),
              onClick: le,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, h1)) : L("", !0),
            k("link") ? (o(), r("svg", {
              key: 2,
              class: g(nt),
              onClick: j,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, b1)) : L("", !0),
            k("blockquote") ? (o(), r("svg", {
              key: 3,
              class: g(nt),
              onClick: U,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, _1)) : L("", !0),
            k("image") ? (o(), r("svg", {
              key: 4,
              class: g(nt),
              onClick: oe,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, x1)) : L("", !0),
            k("code") ? (o(), r("svg", {
              key: 5,
              class: g(nt),
              onClick: A,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, M1)) : L("", !0),
            k("heading") ? (o(), r("svg", {
              key: 6,
              class: g(nt),
              onClick: q,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, F1)) : L("", !0),
            k("orderedList") ? (o(), r("svg", {
              key: 7,
              class: g(nt),
              icon: "",
              onClick: K,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, D1)) : L("", !0),
            k("unorderedList") ? (o(), r("svg", {
              key: 8,
              class: g(nt),
              onClick: W,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, B1)) : L("", !0),
            k("strikethrough") ? (o(), r("svg", {
              key: 9,
              class: g(nt),
              onClick: w,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, R1)) : L("", !0),
            k("undo") ? (o(), r("svg", {
              key: 10,
              class: g(nt),
              onClick: b,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, z1)) : L("", !0),
            k("redo") ? (o(), r("svg", {
              key: 11,
              class: g(nt),
              onClick: D,
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24"
            }, Q1)) : L("", !0),
            z(h.$slots, "toolbarbuttons", {
              instance: (Y = He()) == null ? void 0 : Y.exposed
            })
          ]),
          k("help") && h.helpUrl ? (o(), r("div", K1, [
            l("a", {
              title: "formatting help",
              target: "_blank",
              href: h.helpUrl,
              tabindex: "-1"
            }, [
              (o(), r("svg", {
                class: g(nt),
                xmlns: "http://www.w3.org/2000/svg",
                width: "24",
                height: "24",
                viewBox: "0 0 24 24"
              }, G1))
            ], 8, Z1)
          ])) : L("", !0)
        ])),
        l("div", J1, [
          l("textarea", {
            ref_key: "txt",
            ref: y,
            name: h.id,
            id: h.id,
            class: g(p.value),
            label: h.label,
            value: h.modelValue,
            rows: h.rows || 6,
            disabled: h.disabled,
            onInput: x[0] || (x[0] = (ee) => {
              var re;
              return _(((re = ee.target) == null ? void 0 : re.value) || "");
            }),
            onKeydown: dn(E, ["tab"])
          }, null, 42, X1)
        ]),
        c.value ? (o(), r("p", {
          key: 2,
          class: "mt-2 text-sm text-red-500",
          id: `${h.id}-error`
        }, T(c.value), 9, Y1)) : h.help ? (o(), r("p", {
          key: 3,
          class: "mt-2 text-sm text-gray-500",
          id: `${h.id}-description`
        }, T(h.help), 9, eh)) : L("", !0),
        z(h.$slots, "footer", Se({
          inputElement: y.value,
          id: h.id,
          modelValue: h.modelValue,
          status: h.status
        }, h.$attrs))
      ]);
    };
  }
}), sh = {
  key: 0,
  class: "relative z-10 lg:hidden",
  role: "dialog",
  "aria-modal": "true"
}, lh = { class: "fixed inset-0 flex" }, nh = /* @__PURE__ */ l("span", { class: "sr-only" }, "Close sidebar", -1), oh = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6 text-white dark:text-black",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M6 18L18 6M6 6l12 12"
  })
], -1), ah = [
  nh,
  oh
], rh = { class: "flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-black px-6 pb-2" }, ih = { class: "hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col" }, uh = { class: "flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6" }, dh = {
  class: /* @__PURE__ */ g(["sticky top-0 flex items-center gap-x-6 bg-white dark:bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden"])
}, ch = /* @__PURE__ */ l("span", { class: "sr-only" }, "Open sidebar", -1), fh = /* @__PURE__ */ l("svg", {
  class: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  "stroke-width": "1.5",
  stroke: "currentColor",
  "aria-hidden": "true"
}, [
  /* @__PURE__ */ l("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  })
], -1), vh = [
  ch,
  fh
], ph = /* @__PURE__ */ ue({
  __name: "SidebarLayout",
  setup(e, { expose: t }) {
    const { transition: s } = so(), n = I(!0), a = I(""), i = {
      entering: { cls: "transition-opacity ease-linear duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "transition-opacity ease-linear duration-300", from: "opacity-100", to: "opacity-0" }
    }, u = I(""), d = {
      entering: { cls: "transition ease-in-out duration-300 transform", from: "-translate-x-full", to: "translate-x-0" },
      leaving: { cls: "transition ease-in-out duration-300 transform", from: "translate-x-0", to: "-translate-x-full" }
    }, c = I(""), f = {
      entering: { cls: "ease-in-out duration-300", from: "opacity-0", to: "opacity-100" },
      leaving: { cls: "ease-in-out duration-300", from: "opacity-100", to: "opacity-0" }
    };
    function m(p) {
      s(i, a, p), s(d, u, p), s(f, c, p), setTimeout(() => n.value = p, 300);
    }
    function $() {
      m(!0);
    }
    function k() {
      m(!1);
    }
    return t({ show: $, hide: k, toggle: m }), (p, y) => (o(), r("div", null, [
      n.value ? (o(), r("div", sh, [
        l("div", {
          class: g(["fixed inset-0 bg-gray-900/80", a.value])
        }, null, 2),
        l("div", lh, [
          l("div", {
            class: g(["relative mr-16 flex w-full max-w-xs flex-1", u.value])
          }, [
            l("div", {
              class: g(["absolute left-full top-0 flex w-16 justify-center pt-5", c.value])
            }, [
              l("button", {
                type: "button",
                onClick: k,
                class: "-m-2.5 p-2.5"
              }, ah)
            ], 2),
            l("div", rh, [
              z(p.$slots, "default")
            ])
          ], 2)
        ])
      ])) : L("", !0),
      l("div", ih, [
        l("div", uh, [
          z(p.$slots, "default")
        ])
      ]),
      l("div", dh, [
        l("button", {
          type: "button",
          onClick: $,
          class: "-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
        }, vh),
        z(p.$slots, "mobiletitlebar")
      ])
    ]));
  }
}), mh = Ja, hh = ur, gh = pr, yh = hr, bh = oo, wh = _r, kh = xr, _h = Mr, $h = Fr, Ch = Tr, xh = Or, Lh = zr, Vh = Qr, Mh = li, Sh = $d, Ah = Bd, Fh = Rl, Th = Hl, Ih = El, Dh = ao, Ph = Od, jh = Kd, Bh = ec, Oh = ac, Hh = pc, Rh = jc, Eh = o0, Nh = k0, zh = C0, Uh = x0, qh = E0, Qh = N0, Kh = ff, Zh = If, Wh = ev, Gh = wv, Jh = _v, Xh = Mv, Yh = Iv, eg = Dv, tg = Rv, sg = qv, lg = Zv, ng = lp, og = up, ag = Cp, rg = Tp, ig = Mm, ug = Bm, dg = Nm, cg = r1, fg = th, vg = ph, pg = {
  Alert: mh,
  AlertSuccess: hh,
  ErrorSummary: gh,
  InputDescription: yh,
  Icon: bh,
  Loading: wh,
  OutlineButton: kh,
  PrimaryButton: _h,
  SecondaryButton: $h,
  TextLink: Ch,
  Breadcrumbs: xh,
  Breadcrumb: Lh,
  NavList: Vh,
  NavListItem: Mh,
  AutoQueryGrid: Sh,
  SettingsIcons: Ah,
  FilterViews: Fh,
  FilterColumn: Th,
  QueryPrefs: Ih,
  EnsureAccess: Dh,
  EnsureAccessDialog: Ph,
  TextInput: jh,
  TextareaInput: Bh,
  SelectInput: Oh,
  CheckboxInput: Hh,
  TagInput: Rh,
  FileInput: Eh,
  Autocomplete: Nh,
  Combobox: zh,
  DynamicInput: Uh,
  LookupInput: qh,
  AutoFormFields: Qh,
  AutoForm: Kh,
  AutoCreateForm: Zh,
  AutoEditForm: Wh,
  AutoViewForm: Gh,
  ConfirmDelete: Jh,
  FormLoading: Xh,
  DataGrid: Yh,
  CellFormat: eg,
  PreviewFormat: tg,
  HtmlFormat: sg,
  MarkupFormat: lg,
  MarkupModel: ng,
  CloseButton: og,
  SlideOver: ag,
  ModalDialog: rg,
  ModalLookup: ig,
  Tabs: ug,
  DarkModeToggle: dg,
  SignIn: cg,
  MarkdownInput: fg,
  SidebarLayout: vg
}, tl = pg || {}, wg = {
  install(e) {
    Object.keys(tl).forEach((s) => {
      e.component(s, tl[s]);
    });
    function t(s) {
      const a = Object.keys(s).filter((i) => s[i]).map((i) => `${encodeURIComponent(i)}=${encodeURIComponent(s[i])}`).join("&");
      return a ? "?" + a : "./";
    }
    e.directive("href", function(s, n) {
      s.href = t(n.value), s.onclick = (a) => {
        a.preventDefault(), history.pushState(n.value, "", t(n.value));
      };
    });
  },
  component(e, t) {
    return e ? t ? X.components[e] = t : X.components[e] || tl[e] || null : null;
  }
};
export {
  mh as Alert,
  hh as AlertSuccess,
  Zh as AutoCreateForm,
  Wh as AutoEditForm,
  Kh as AutoForm,
  Qh as AutoFormFields,
  Sh as AutoQueryGrid,
  Gh as AutoViewForm,
  Nh as Autocomplete,
  Lh as Breadcrumb,
  xh as Breadcrumbs,
  eg as CellFormat,
  Hh as CheckboxInput,
  og as CloseButton,
  zh as Combobox,
  pg as Components,
  Jh as ConfirmDelete,
  dg as DarkModeToggle,
  Yh as DataGrid,
  Uh as DynamicInput,
  Dh as EnsureAccess,
  Ph as EnsureAccessDialog,
  gh as ErrorSummary,
  Eh as FileInput,
  Th as FilterColumn,
  Fh as FilterViews,
  Xh as FormLoading,
  sg as HtmlFormat,
  bh as Icon,
  yh as InputDescription,
  wh as Loading,
  qh as LookupInput,
  fg as MarkdownInput,
  lg as MarkupFormat,
  ng as MarkupModel,
  qo as MetadataApp,
  rg as ModalDialog,
  ig as ModalLookup,
  Vh as NavList,
  Mh as NavListItem,
  kh as OutlineButton,
  tg as PreviewFormat,
  _h as PrimaryButton,
  Ih as QueryPrefs,
  $h as SecondaryButton,
  Oh as SelectInput,
  Ah as SettingsIcons,
  vg as SidebarLayout,
  cg as SignIn,
  ag as SlideOver,
  ug as Tabs,
  Rh as TagInput,
  jh as TextInput,
  Ch as TextLink,
  Bh as TextareaInput,
  bg as css,
  wg as default,
  Ol as useAuth,
  ys as useClient,
  Nt as useConfig,
  Uo as useFiles,
  yg as useFormatters,
  ut as useMetadata,
  so as useUtils
};
