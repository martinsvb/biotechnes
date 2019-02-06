<?

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS, DELETE");

use app\helpers\csv;
use app\mail\mailSender;
use app\response\resp;

include_once("./start.php");

new start();

$data = json_decode(file_get_contents('php://input'), true);

$mailSender = new mailSender();
$mailSender->setFrom($data['mail']);
$to = 'svobodamartin@centrum.cz';
$message = '<html>
<span>Jméno a příjmení: </span><span><b>' . $data['name'] . '</b></span><br /><br />
<span>Firma: </span><span><b>' . $data['company'] . '</b></span><br /><br />
<span>E-mail: </span><span><b>' . $data['mail'] . '</b></span><br /><br />
<span>Telefon: </span><span><b>' . $data['phone'] . '</b></span><br /><br />
<span>Zpráva:</span><br /><p>' . $data['message'] . '</p>
</html>';
$result = $mailSender->send($to, 'biotechnes', $message);

$csv = new csv();
$csv->addData("www/php/emails.csv", $data);

$resp = new resp();
$resp->send(200, $result['sent']);
