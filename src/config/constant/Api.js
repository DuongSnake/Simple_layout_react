export const SERVER_API_URL = "http://localhost:8080";

const PRE_FIX_AUTH = '/api/auth/';
const PRE_FIX_USER = '/user/v1/';
const PRE_FIX_API = '/api/v1/';
/**
 * Authentication API endpoints
 */
export const APT_POST_SIGNIN = PRE_FIX_AUTH + 'login';
export const API_EXTEND_TOKEN = PRE_FIX_AUTH + 'extend';
export const API_CHANGE_PASSWORD_NO_AUTH = PRE_FIX_AUTH + 'changePass';
export const API_CHANGE_PASSWORD = PRE_FIX_USER + 'changePassword';
export const API_CHANGE_LOGIN_PASSWORD = PRE_FIX_USER + 'changeLoginPassword';
export const API_FORGOT_PASSWORD = PRE_FIX_AUTH + 'forgotPassword';
export const API_RESET_PASSWORD = PRE_FIX_AUTH + 'resetPassword';
export const API_FIND_USER_ID_BY_USERNAME = PRE_FIX_AUTH + 'findId';
/**
 * User management API endpoints
 */
export const API_CREATE_USER = PRE_FIX_API + 'user/insert';
export const API_UPDATE_USER = PRE_FIX_API + 'user/update';
export const API_DELETE_USER = PRE_FIX_API + 'user/delete';
export const API_SELECT_LIST_USER = PRE_FIX_API + 'user/selectList';
export const API_SELECT_ALL_ROLES = PRE_FIX_API + 'user/selectAllRole';
export const API_SELECT_ALL_STUDENTS = PRE_FIX_API + 'user/selectAllStudent';
export const API_SELECT_ALL_INSTRUCTORS = PRE_FIX_API + 'user/selectAllInstructor';



/**
 * Major Management
 */
export const API_GET_LIST_MAJOR = PRE_FIX_API + 'major/selectList';
export const API_ADD_MAJOR = PRE_FIX_API + 'major/insert';
export const API_UPDATE_MAJOR = PRE_FIX_API + 'major/update';
export const API_DELETE_MAJOR = PRE_FIX_API + 'major/delete';
export const API_SELECT_MAJOR = PRE_FIX_API + 'major/select';
export const API_GET_ALL_SELECT_MAJOR_ACITVE = PRE_FIX_API + 'major/selectListAllActive';

/**
 * Admission Period Management
 */
export const API_SELECT_LIST_ADMISSION_PERIOD = PRE_FIX_API + 'admissionPeriod/selectList';
export const API_CREATE_ADMISSION_PERIOD = PRE_FIX_API + 'admissionPeriod/insert';
export const API_UPDATE_ADMISSION_PERIOD = PRE_FIX_API + 'admissionPeriod/update';
export const API_DELETE_ADMISSION_PERIOD = PRE_FIX_API + 'admissionPeriod/delete';
export const API_SELECT_ADMISSION_PERIOD = PRE_FIX_API + 'admissionPeriod/select';
export const API_GET_ALL_SELECT_ADMISSION_PERIOD_ACITVE = PRE_FIX_API + 'admissionPeriod/selectListAllActive';

/**
 * Period Assignment Management
 */
export const API_SELECT_LIST_PERIOD_ASSIGNMENT = PRE_FIX_API + 'periodAssignment/selectList';
export const API_CREATE_PERIOD_ASSIGNMENT = PRE_FIX_API + 'periodAssignment/insert';
export const API_UPDATE_PERIOD_ASSIGNMENT = PRE_FIX_API + 'periodAssignment/update';
export const API_DELETE_PERIOD_ASSIGNMENT = PRE_FIX_API + 'periodAssignment/delete';
export const API_SELECT_PERIOD_ASSIGNMENT = PRE_FIX_API + 'periodAssignment/select';
export const API_GET_ALL_PERIOD_ASSIGNMENT_ACITVE = PRE_FIX_API + 'periodAssignment/selectListAllActive';

/**
 * Instructor Map Period Assignment Management
 */
export const API_SELECT_LIST_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/selectList';
export const API_CREATE_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/insert';
export const API_UPDATE_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/update';
export const API_DELETE_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/delete';
export const API_SELECT_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/select';
export const API_INSERT_LIST_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/insertListInstructorMapPeriodAssignment';

/**
 * Student map Instructor Management
 */
export const API_SELECT_LIST_STUDENT_MAP_INSTRUCTOR = PRE_FIX_API + 'studentMapInstructor/selectList';
export const API_CREATE_STUDENT_MAP_INSTRUCTOR = PRE_FIX_API + 'studentMapInstructor/insert';
export const API_UPDATE_STUDENT_MAP_INSTRUCTOR = PRE_FIX_API + 'studentMapInstructor/update';
export const API_DELETE_STUDENT_MAP_INSTRUCTOR = PRE_FIX_API + 'studentMapInstructor/delete';
export const API_SELECT_STUDENT_MAP_INSTRUCTOR = PRE_FIX_API + 'studentMapInstructor/select';
export const API_GET_ALL_STUDENT_MAP_INSTRUCTOR_ACTIVE = PRE_FIX_API + 'studentMapInstructor/selectListAllActive';
export const API_GET_STUDENT_READY_MAP_CRITICAL = PRE_FIX_API + 'studentMapInstructor/selectListUserToMapCritical';


/**
 * Student map Critical Management
 */
export const API_SELECT_LIST_STUDENT_MAP_CRITICAL = PRE_FIX_API + 'studentMapCritical/selectList';
export const API_CREATE_STUDENT_MAP_CRITICAL = PRE_FIX_API + 'studentMapCritical/insert';
export const API_UPDATE_STUDENT_MAP_CRITICAL = PRE_FIX_API + 'studentMapCritical/update';
export const API_DELETE_STUDENT_MAP_CRITICAL = PRE_FIX_API + 'studentMapCritical/delete';
export const API_SELECT_STUDENT_MAP_CRITICAL = PRE_FIX_API + 'studentMapCritical/select';
export const API_GET_STUDENT_MAP_CRITICAL = PRE_FIX_API + 'studentMapCritical/selectListUserToMapCritical';
export const API_GET_LIST_CRITICAL_BY_STUDENT_ID = PRE_FIX_API + 'studentMapCritical/selectListCriticalByStudentId';
export const API_GET_LIST_ASSIGNMENT_WAITING_FINAL_APPROVE = PRE_FIX_API + 'studentMapCritical/selectListWaitngFinalApprove';
export const API_APPROVE_FINAL_ASSIGNMENT_GO_TO_PROTECT = PRE_FIX_API + 'studentMapCritical/approveFinalAssignmentStudentRegister';
export const API_SELECT_LIST_STUDENT_BY_CRITICAL_ID = PRE_FIX_API + 'studentMapCritical/selectListStudentByCriticalId';

/**
 * Assignment Student Register Management
 */
export const API_SELECT_LIST_ASSIGNMENT_STUDENT_REGISTER = PRE_FIX_API + 'assignmentStudentRegister/selectList';
export const API_CREATE_ASSIGNMENT_STUDENT_REGISTER = PRE_FIX_API + 'assignmentStudentRegister/insert';
export const API_UPDATE_ASSIGNMENT_STUDENT_REGISTER = PRE_FIX_API + 'assignmentStudentRegister/update';
export const API_DELETE_ASSIGNMENT_STUDENT_REGISTER = PRE_FIX_API + 'assignmentStudentRegister/delete';
export const API_SELECT_ASSIGNMENT_STUDENT_REGISTER = PRE_FIX_API + 'assignmentStudentRegister/select';


/**
 * Score assignement management
 */
export const API_SELECT_LIST_SCORE_ASSIGNMENT = PRE_FIX_API + 'scoreAssignment/selectListNewScoreAssignment';
export const API_CREATE_SCORE_ASSIGNMENT = PRE_FIX_API + 'scoreAssignment/insert';
export const API_UPDATE_SCORE_ASSIGNMENT = PRE_FIX_API + 'scoreAssignment/update';
export const API_DELETE_SCORE_ASSIGNMENT = PRE_FIX_API + 'scoreAssignment/delete';
export const API_SELECT_SCORE_ASSIGNMENT = PRE_FIX_API + 'scoreAssignment/select';
export const API_SELECT_LIST_ASSIGNMENT_BY_PERIOD_TIME = PRE_FIX_API + 'scoreAssignment/selectListAssignmentReadyToAddScore';

/**
 * List Assignment register(admin site)
 */
export const API_SELECT_LIST_ASSIGNMENT_WAITING_APPROVE_ADMIN_SITE = PRE_FIX_API + 'assignmentStudentRegister/selectListWaitingSend';
export const API_SELECT_LIST_ASSIGNMENT_STUDENT_ADMIN_SIDE = PRE_FIX_API + 'assignmentStudentRegister/selectList';
export const API_CREATE_ASSIGNMENT_STUDENT_ADMIN_SIDE = PRE_FIX_API + 'assignmentStudentRegister/insert';
export const API_UPDATE_ASSIGNMENT_STUDENT_ADMIN_SIDE = PRE_FIX_API + 'assignmentStudentRegister/update';
export const API_DELETE_ASSIGNMENT_STUDENT_ADMIN_SIDE = PRE_FIX_API + 'assignmentStudentRegister/delete';
export const API_SELECT_ASSIGNMENT_STUDENT_ADMIN_SIDE = PRE_FIX_API + 'assignmentStudentRegister/select';
export const API_RESERVE_ASSIGNMENT_STUDENT_ADMIN_SIDE = PRE_FIX_API + 'assignmentStudentRegister/reserveListAssignment';
export const API_SEND_REQUEST_ASSIGNMENT_STUDENT_ADMIN_SIDE = PRE_FIX_API + 'assignmentStudentRegister/sendRequestAssignment';


/**
 * User site
 */


/**
 * List Assignment register(user site)
 */
export const API_SELECT_LIST_ASSIGNMENT_WAITING_APPROVE = PRE_FIX_API + 'assignmentRegister/selectListWaitingSend';
export const API_SELECT_LIST_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/selectList';
export const API_CREATE_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/insert';
export const API_UPDATE_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/update';
export const API_DELETE_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/delete';
export const API_SELECT_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/select';
export const API_RESERVE_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/reserveListAssignment';
export const API_SEND_REQUEST_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/sendRequestAssignment';
export const API_DOWNLOAD_FILE_STUDENT_UPLOAD_USER_SIDE = PRE_FIX_API + 'file/download';


/**
 * List Assignment register(instructor site)
 */
export const API_SELECT_LIST_ASSIGNMENT_WAITING_APPROVE_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/selectListWaitingSend';
export const API_SELECT_LIST_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/selectList';
export const API_CREATE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/insert';
export const API_UPDATE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/update';
export const API_DELETE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/delete';
export const API_SELECT_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/select';
export const API_RESERVE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/reserveListAssignment';
export const API_SEND_REQUEST_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/sendRequestAssignment';
export const API_SEND_FINAL_APPROVE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/sendRequestFinalApproveAssignment';
export const API_DOWNLOAD_FILE_STUDENT_UPLOAD_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/download';
export const API_APPROVE_ASSIGNMENT_STUDENT_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/approveAssignment';
export const API_SELECT_LIST_ASSIGNMENT_APPROVE_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/selectListAssApprove';
export const API_SELECT_LIST_STUDENT_NOT_REGISTER_ASSIGNMENT_BEFORE_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/selectListStudentNotRegisterAssignment';
export const API_SELECT_LIST_STUDENT_MAP_INSTRUCTOR_BEFORE_INSTRUCTOR_SIDE = PRE_FIX_API + 'assignmentRegisterByInstructor/selectListStudentMapWithInstructorId';

/**
 * List Assignment register process (type process was occur when instructor approve the assignment student register)
 */
export const API_SELECT_LIST_ASSIGNMENT_PROCESS = PRE_FIX_API + 'assignmentRegister/selectListAssApprove';
export const API_SELECT_LIST_All_ASSIGNMENT_APPROVE = PRE_FIX_API + 'assignmentRegister/selectListAllAssApprove';
export const API_SELECT_LIST_FILE_ASSIGNMENT_PROCESS = PRE_FIX_API + 'assignmentRegister/selectListFileAss';
export const API_CREATE_LIST_FILE_ASSIGNMENT_PROCESS = PRE_FIX_API + 'assignmentRegister/insertListFileAssignment';
export const API_UPDATE_LIST_FILE_ASSIGNMENT_PROCESS = PRE_FIX_API + 'assignmentRegister/updateListFileAssignment';

/**
 * Student management
 */
export const API_SELECT_LIST_STUDENT = PRE_FIX_API + 'student/selectList';
export const API_CREATE_STUDENT = PRE_FIX_API + 'student/insert';
export const API_UPDATE_STUDENT = PRE_FIX_API + 'student/update';
export const API_DELETE_STUDENT = PRE_FIX_API + 'student/delete';
export const API_SELECT_STUDENT = PRE_FIX_API + 'student/select';
export const API_DOWNLOAD_TEMPLATE_STUDENT = PRE_FIX_API + 'student/downloadTemplate';
/**
 * Instructor management
 */
export const API_SELECT_LIST_INSTRUCTOR = PRE_FIX_API + 'instructor/selectList';
export const API_CREATE_INSTRUCTOR = PRE_FIX_API + 'instructor/insert';
export const API_UPDATE_INSTRUCTOR = PRE_FIX_API + 'instructor/update';
export const API_DELETE_INSTRUCTOR = PRE_FIX_API + 'instructor/delete';
export const API_SELECT_INSTRUCTOR = PRE_FIX_API + 'instructor/select';

/**
 * File upload management
 */
export const API_SELECT_LIST_FILE_UPLOAD = PRE_FIX_API + 'file/selectList2';
export const API_CREATE_FILE_UPLOAD = PRE_FIX_API + 'file/insert';
export const API_UPDATE_FILE_UPLOAD = PRE_FIX_API + 'file/update';
export const API_DELETE_FILE_UPLOAD = PRE_FIX_API + 'file/delete';
export const API_SELECT_FILE_UPLOAD = PRE_FIX_API + 'file/select';
export const API_SELECT_LIST_ASSIGNMENT_BY_ADMISSION_TIME = PRE_FIX_API + 'file/selectListAssignmentByAdmissionTime';

/**
 * Score assignment management( user site )
 */
export const API_SELECT_LIST_SCORE_ASSIGNMENT_USER_SIDE = PRE_FIX_API + 'scoreStudent/selectList';
/**
 * Score assignment management( instructor site )
 */
export const API_SELECT_LIST_SCORE_ASSIGNMENT_INSTRUCTOR_SIDE = PRE_FIX_API + 'scoreInstructor/selectList';
export const API_SELECT_LIST_ASSIGNMENT_BY_ADMISSION_PERIOD_INSTRUCTOR_SIDE = PRE_FIX_API + 'scoreInstructor/selectListAssignmentByAdmissionPeriod';

/**
 * Dashboard report year
 */
export const API_SELECT_ALL_TOTAL_RECORD_BY_YEAR = PRE_FIX_API + 'reportYear/selectAllTotalRecrod';
export const API_SELECT_TOP_5_PERIOD_BY_YEAR = PRE_FIX_API + 'reportYear/selectTop5Period';
export const API_SELECT_TOP_5_INSTRUCTOR_BY_YEAR = PRE_FIX_API + 'reportYear/selectTop5Instructor';
