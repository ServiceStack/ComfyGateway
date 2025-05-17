""" Options:
Date: 2025-05-16 13:08:34
Version: 8.80
Tip: To override a DTO option, remove "#" prefix before updating
BaseUrl: http://localhost:5000

#GlobalNamespace: 
#AddServiceStackTypes: True
#AddResponseStatus: False
#AddImplicitVersion: 
#AddDescriptionAsComments: True
#IncludeTypes: 
#ExcludeTypes: 
#DefaultImports: datetime,decimal,marshmallow.fields:*,servicestack:*,typing:*,dataclasses:dataclass/field,dataclasses_json:dataclass_json/LetterCase/Undefined/config,enum:Enum/IntEnum
#DataClass: 
#DataClassJson: 
"""

import datetime
import decimal
from marshmallow.fields import *
from servicestack import *
from typing import *
from dataclasses import dataclass, field
from dataclasses_json import dataclass_json, LetterCase, Undefined, config
from enum import Enum, IntEnum


class RoomType(str, Enum):
    SINGLE = 'Single'
    DOUBLE = 'Double'
    QUEEN = 'Queen'
    TWIN = 'Twin'
    SUITE = 'Suite'


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class Coupon:
    """
    Discount Coupons
    """

    id: Optional[str] = None
    description: Optional[str] = None
    discount: int = 0
    expiry_date: datetime.datetime = datetime.datetime(1, 1, 1)


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class User:
    id: Optional[str] = None
    user_name: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    display_name: Optional[str] = None
    profile_url: Optional[str] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class Booking(AuditBase):
    """
    Booking Details
    """

    id: int = 0
    name: Optional[str] = None
    room_type: Optional[RoomType] = None
    room_number: int = 0
    booking_start_date: datetime.datetime = datetime.datetime(1, 1, 1)
    booking_end_date: Optional[datetime.datetime] = None
    cost: Decimal = decimal.Decimal(0)
    # @References(typeof(Coupon))
    coupon_id: Optional[str] = None

    discount: Optional[Coupon] = None
    notes: Optional[str] = None
    cancelled: Optional[bool] = None
    employee: Optional[User] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class ComfyTask:
    id: int = 0
    name: Optional[str] = None


class ComfyWorkflowType(str, Enum):
    TEXT_TO_IMAGE = 'TextToImage'
    IMAGE_TO_IMAGE = 'ImageToImage'
    IMAGE_TO_TEXT = 'ImageToText'
    TEXT_TO_AUDIO = 'TextToAudio'
    TEXT_TO_VIDEO = 'TextToVideo'
    TEXT_TO3_D = 'TextTo3D'
    AUDIO_TO_TEXT = 'AudioToText'
    VIDEO_TO_TEXT = 'VideoToText'
    IMAGE_TO_VIDEO = 'ImageToVideo'


class ComfyPrimarySource(str, Enum):
    TEXT = 'Text'
    IMAGE = 'Image'
    VIDEO = 'Video'
    AUDIO = 'Audio'


class ComfyInputType(str, Enum):
    UNKNOWN = 'Unknown'
    AUDIO = 'Audio'
    BOOLEAN = 'Boolean'
    CLIP = 'Clip'
    CLIP_VISION = 'ClipVision'
    CLIP_VISION_OUTPUT = 'ClipVisionOutput'
    COMBO = 'Combo'
    CONDITIONING = 'Conditioning'
    CONTROL_NET = 'ControlNet'
    ENUM = 'Enum'
    FASTER_WHISPER_MODEL = 'FasterWhisperModel'
    FILEPATH = 'Filepath'
    FL2_MODEL = 'Fl2Model'
    FLOAT_ = 'Float'
    FLOATS = 'Floats'
    GLIGEN = 'Gligen'
    GUIDER = 'Guider'
    HOOKS = 'Hooks'
    IMAGE = 'Image'
    INT_ = 'Int'
    LATENT = 'Latent'
    LATENT_OPERATION = 'LatentOperation'
    LOAD3_D = 'Load3D'
    LOAD3_D_ANIMATION = 'Load3DAnimation'
    MASK = 'Mask'
    MESH = 'Mesh'
    MODEL = 'Model'
    NOISE = 'Noise'
    PHOTOMAKER = 'Photomaker'
    SAMPLER = 'Sampler'
    SIGMAS = 'Sigmas'
    STRING = 'String'
    STYLE_MODEL = 'StyleModel'
    SUBTITLE = 'Subtitle'
    TRANSCRIPTION_PIPELINE = 'TranscriptionPipeline'
    TRANSCRIPTIONS = 'Transcriptions'
    UPSCALE_MODEL = 'UpscaleModel'
    VAE = 'VAE'
    VHS_AUDIO = 'VHSAudio'
    VOXEL = 'Voxel'
    WAV_BYTES = 'WavBytes'
    WAV_BYTES_BATCH = 'WavBytesBatch'
    WEBCAM = 'Webcam'


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class ComfyInput:
    class_type: Optional[str] = None
    node_id: int = 0
    value_index: int = 0
    name: Optional[str] = None
    label: Optional[str] = None
    type: Optional[ComfyInputType] = None
    tooltip: Optional[str] = None
    default: Optional[Any] = None
    min: Optional[Decimal] = None
    max: Optional[Decimal] = None
    step: Optional[Decimal] = None
    round: Optional[Decimal] = None
    multiline: Optional[bool] = None
    dynamic_prompts: Optional[bool] = None
    control_after_generate: Optional[bool] = None
    enum_values: Optional[List[str]] = None
    combo_values: Optional[Dict[str, Any]] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class ComfyWorkflowInfo:
    name: Optional[str] = None
    path: Optional[str] = None
    type: Optional[ComfyWorkflowType] = None
    input: Optional[ComfyPrimarySource] = None
    output: Optional[ComfyPrimarySource] = None
    inputs: List[ComfyInput] = field(default_factory=list)


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class ComfyTextOutput:
    node_id: Optional[str] = None
    text: Optional[str] = None


class AssetType(str, Enum):
    IMAGE = 'Image'
    VIDEO = 'Video'
    AUDIO = 'Audio'
    TEXT = 'Text'
    BINARY = 'Binary'


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class ComfyAssetOutput:
    node_id: Optional[str] = None
    url: Optional[str] = None
    type: Optional[AssetType] = None
    file_name: Optional[str] = None
    width: Optional[int] = None
    height: Optional[int] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class ComfyResult:
    prompt_id: Optional[str] = None
    client_id: Optional[str] = None
    duration: Optional[datetime.timedelta] = None
    texts: Optional[List[ComfyTextOutput]] = None
    assets: Optional[List[ComfyAssetOutput]] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class PageStats:
    label: Optional[str] = None
    total: int = 0


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class AnalyticsLogInfo:
    id: int = 0
    date_time: datetime.datetime = datetime.datetime(1, 1, 1)
    browser: Optional[str] = None
    device: Optional[str] = None
    bot: Optional[str] = None
    op: Optional[str] = None
    user_id: Optional[str] = None
    user_name: Optional[str] = None
    api_key: Optional[str] = None
    ip: Optional[str] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class RequestSummary:
    name: Optional[str] = None
    total_requests: int = 0
    total_request_length: int = 0
    min_request_length: int = 0
    max_request_length: int = 0
    total_duration: float = 0.0
    min_duration: float = 0.0
    max_duration: float = 0.0
    status: Optional[Dict[int, int]] = None
    durations: Optional[Dict[str, int]] = None
    apis: Optional[Dict[str, int]] = None
    users: Optional[Dict[str, int]] = None
    ips: Optional[Dict[str, int]] = None
    api_keys: Optional[Dict[str, int]] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class AnalyticsReports:
    id: int = 0
    created: datetime.datetime = datetime.datetime(1, 1, 1)
    version: Decimal = decimal.Decimal(0)
    apis: Optional[Dict[str, RequestSummary]] = None
    users: Optional[Dict[str, RequestSummary]] = None
    tags: Optional[Dict[str, RequestSummary]] = None
    status: Optional[Dict[str, RequestSummary]] = None
    days: Optional[Dict[str, RequestSummary]] = None
    api_keys: Optional[Dict[str, RequestSummary]] = None
    ips: Optional[Dict[str, RequestSummary]] = None
    browsers: Optional[Dict[str, RequestSummary]] = None
    devices: Optional[Dict[str, RequestSummary]] = None
    bots: Optional[Dict[str, RequestSummary]] = None
    durations: Optional[Dict[str, int]] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class ComfyTasksResponse:
    results: List[ComfyTask] = field(default_factory=list)
    response_status: Optional[ResponseStatus] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class RegisterComfyAgentResponse:
    id: int = 0
    api_key: Optional[str] = None
    device_id: Optional[str] = None
    nodes: List[str] = field(default_factory=list)
    checkpoints: List[str] = field(default_factory=list)
    unets: List[str] = field(default_factory=list)
    vaes: List[str] = field(default_factory=list)
    loras: List[str] = field(default_factory=list)
    clips: List[str] = field(default_factory=list)
    clip_visions: List[str] = field(default_factory=list)
    response_status: Optional[ResponseStatus] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetComfyWorkflowInfoResponse:
    result: Optional[ComfyWorkflowInfo] = None
    response_status: Optional[ResponseStatus] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetExecutedComfyWorkflowResultsResponse:
    result: Optional[ComfyResult] = None
    response_status: Optional[ResponseStatus] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetExecutedComfyWorkflowsResultsResponse:
    results: Optional[Dict[str, ComfyResult]] = None
    errors: Optional[Dict[str, ResponseStatus]] = None
    response_status: Optional[ResponseStatus] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class HelloResponse:
    result: Optional[str] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class AdminDataResponse:
    page_stats: List[PageStats] = field(default_factory=list)


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetAnalyticsInfoResponse:
    months: Optional[List[str]] = None
    result: Optional[AnalyticsLogInfo] = None
    response_status: Optional[ResponseStatus] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetAnalyticsReportsResponse:
    result: Optional[AnalyticsReports] = None
    response_status: Optional[ResponseStatus] = None


# @Route("/comfy/tasks")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetComfyTasks(IReturn[ComfyTasksResponse], IGet):
    pass


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class RegisterComfyAgent(IReturn[RegisterComfyAgentResponse], IPost):
    # @Validate(Validator="NotEmpty")
    device_id: Optional[str] = None


# @Route("/comfy/workflows")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetComfyWorkflows(IReturn[List[str]], IGet):
    pass


# @Route("/comfy/workflows/info")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetComfyWorkflowInfo(IReturn[GetComfyWorkflowInfoResponse], IGet):
    # @Validate(Validator="NotEmpty")
    workflow: Optional[str] = None


# @Route("/comfy/workflows/prompt")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetComfyApiPrompt(IReturn[str], IGet):
    # @Validate(Validator="NotEmpty")
    workflow: Optional[str] = None

    args: Optional[Dict[str, Any]] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetExecutedComfyWorkflowResults(IReturn[GetExecutedComfyWorkflowResultsResponse], IGet):
    ref_id: Optional[str] = None
    poll: Optional[bool] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetExecutedComfyWorkflowsResults(IReturn[GetExecutedComfyWorkflowsResultsResponse], IGet):
    ref_ids: List[str] = field(default_factory=list)
    poll: Optional[bool] = None


# @Route("/hello/{Name}")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class Hello(IReturn[HelloResponse], IGet):
    name: Optional[str] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class AdminData(IReturn[AdminDataResponse], IGet):
    pass


# @Route("/bookings", "GET")
# @Route("/bookings/{Id}", "GET")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class QueryBookings(QueryDb[Booking], IReturn[QueryResponse[Booking]]):
    """
    Find Bookings
    """

    id: Optional[int] = None


# @Route("/coupons", "GET")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class QueryCoupons(QueryDb[Coupon], IReturn[QueryResponse[Coupon]]):
    """
    Find Coupons
    """

    id: Optional[str] = None


# @ValidateRequest(Validator="IsAdmin")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class QueryUsers(QueryDb[User], IReturn[QueryResponse[User]]):
    id: Optional[str] = None


# @Route("/bookings", "POST")
# @ValidateRequest(Validator="HasRole(`Employee`)")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class CreateBooking(IReturn[IdResponse], ICreateDb[Booking]):
    """
    Create a new Booking
    """

    # @Validate(Validator="NotEmpty")
    name: Optional[str] = None
    """
    Name this Booking is for
    """


    room_type: Optional[RoomType] = None
    # @Validate(Validator="GreaterThan(0)")
    room_number: int = 0

    # @Validate(Validator="GreaterThan(0)")
    cost: Decimal = decimal.Decimal(0)

    # @Required()
    booking_start_date: datetime.datetime = datetime.datetime(1, 1, 1)

    booking_end_date: Optional[datetime.datetime] = None
    notes: Optional[str] = None
    coupon_id: Optional[str] = None


# @Route("/booking/{Id}", "PATCH")
# @ValidateRequest(Validator="HasRole(`Employee`)")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class UpdateBooking(IReturn[IdResponse], IPatchDb[Booking]):
    """
    Update an existing Booking
    """

    id: int = 0
    name: Optional[str] = None
    room_type: Optional[RoomType] = None
    # @Validate(Validator="GreaterThan(0)")
    room_number: Optional[int] = None

    # @Validate(Validator="GreaterThan(0)")
    cost: Optional[Decimal] = None

    booking_start_date: Optional[datetime.datetime] = None
    booking_end_date: Optional[datetime.datetime] = None
    notes: Optional[str] = None
    coupon_id: Optional[str] = None
    cancelled: Optional[bool] = None


# @Route("/booking/{Id}", "DELETE")
# @ValidateRequest(Validator="HasRole(`Manager`)")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class DeleteBooking(IReturnVoid, IDeleteDb[Booking]):
    """
    Delete a Booking
    """

    id: int = 0


# @Route("/coupons", "POST")
# @ValidateRequest(Validator="HasRole(`Employee`)")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class CreateCoupon(IReturn[IdResponse], ICreateDb[Coupon]):
    # @Validate(Validator="NotEmpty")
    id: Optional[str] = None

    # @Validate(Validator="NotEmpty")
    description: Optional[str] = None

    # @Validate(Validator="GreaterThan(0)")
    discount: int = 0

    # @Validate(Validator="NotNull")
    expiry_date: datetime.datetime = datetime.datetime(1, 1, 1)


# @Route("/coupons/{Id}", "PATCH")
# @ValidateRequest(Validator="HasRole(`Employee`)")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class UpdateCoupon(IReturn[IdResponse], IPatchDb[Coupon]):
    id: Optional[str] = None
    # @Validate(Validator="NotEmpty")
    description: Optional[str] = None

    # @Validate(Validator="NotNull")
    # @Validate(Validator="GreaterThan(0)")
    discount: Optional[int] = None

    # @Validate(Validator="NotNull")
    expiry_date: Optional[datetime.datetime] = None


# @Route("/coupons/{Id}", "DELETE")
# @ValidateRequest(Validator="HasRole(`Manager`)")
@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class DeleteCoupon(IReturnVoid, IDeleteDb[Coupon]):
    """
    Delete a Coupon
    """

    id: Optional[str] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetAnalyticsInfo(IReturn[GetAnalyticsInfoResponse], IGet):
    month: Optional[datetime.datetime] = None
    type: Optional[str] = None
    op: Optional[str] = None
    api_key: Optional[str] = None
    user_id: Optional[str] = None
    ip: Optional[str] = None


@dataclass_json(letter_case=LetterCase.CAMEL, undefined=Undefined.EXCLUDE)
@dataclass
class GetAnalyticsReports(IReturn[GetAnalyticsReportsResponse], IGet):
    month: Optional[datetime.datetime] = None
    filter: Optional[str] = None
    value: Optional[str] = None
    force: Optional[bool] = None

