<?

use app\router\router;
use app\exception\excep;
use app\exception\excepAutoLoad;
use app\exception\excepRouter;

include_once("./start.php");
include_once("./app/helpers/storage.php");
include_once("./app/exception/excep.php");

include_once("./_data/appData.php");

$excep = new excep();

try {
    new start();
    new router();
} catch (excepAutoLoad $e) {
    $excep->handle($e);
} catch (excepRouter $e) {
    $excep->handle($e);
}
