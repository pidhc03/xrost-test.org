<?php
function adpds_socket($args, $servlet){

    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    $subno = $_SERVER['HTTP_X_UP_SUBNO'];
    $guid = $_SERVER['HTTP_X_DCMGUID'];
    $jphone = $_SERVER['HTTP_X_JPHONE_UID'];
    if ($_SERVER['SERVER_PORT'] == 443) $args .= "&adpds_ssl=1";
    $args .= "&adpds_ref=" . rawurlencode($_SERVER['HTTP_REFERER']);

    $host = "dsm.testadp.com";
    $port = 80;
    $path = "/adpds_deliver/m/" . $servlet;
    $timeout = 3;
    $fp = fsockopen($host, $port, $errno, $errstr, $timeout);
    if (!$fp) return '';

    $out = "GET ".$path."?".$args." HTTP/1.0\r\n";
    $out .= "Host: ".$host."\r\n";
    $out .= "User-Agent: ".$user_agent."\r\n";
    if ($subno != '') $out .= "X-Up-Subno: ".$subno."\r\n";
    if ($guid != '') $out .= "X-DCMGUID: ".$guid."\r\n";
    if ($jphone != '') $out .= "X-JPHONE-UID: ".$jphone."\r\n";
    $out .= "Connection: Close\r\n\r\n";
    fwrite($fp, $out);

    $buf = '';
    $header_sec = true;
    while (!feof($fp)) {
        $line = fgets($fp, 1024);
        if (trim($line) == '') {
            $header_sec = false;
        }
        if ($header_sec == false) {
            $buf .= $line . "\r\n";
        }
    }
    fclose($fp);
    return $buf;
}

function adpdsm_ad($args){
    return adpds_socket($args, "ssi");
}

function adpdsm_cv($args){
    adpds_socket($args, "cv");
    return "";
}

?>
