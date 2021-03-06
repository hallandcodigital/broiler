<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Response;
use App\User;
use App\CoreSetting;

class CoreSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!$this->checkUser()){
            return Response::json(array('accessDenied'=>'true','msgType'=>'danger','msg'=>'Sorry, you do not have permission. Please contact the website administrator or owner to resolve this issue.'));
        };
        $user = Auth::user();
        $coreSettingData = CoreSetting::get();
        return Response::json($coreSettingData);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        CoreSetting::create($input);
        return Response::json(array('coreSettingDatas'=>CoreSetting::get(),'msgType'=>'success','msg'=>'Application CoreSetting was successfully Created.'));
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id=null)
    {
        $coreSettingData = CoreSetting::find($id);
        return Response::json($coreSettingData);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id = null)
    {
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $inputs = $request->all();
        foreach ($inputs as $input){
            $coreSettingData = CoreSetting::find($input['id']);
            $coreSettingData->fill($input);
            $coreSettingData->save();
        }
        return Response::json(array('coreSettingDatas'=>CoreSetting::get(),'msgType'=>'success','msg'=>'Application CoreSettings were successfully Updated.'));
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        CoreSetting::find($id)->delete();
        $coreSettingDatas = CoreSetting::get()->toArray();
        return Response::json(array('coreSettingDatas'=>$coreSettingDatas,'msgType'=>'danger','msg'=>'CoreSetting has been successfully deleted'));
    }
    /**
     * Update Logo in public folder
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function updateLogo(Request $request) {
        $file = $request->file('file');
        \Image::make($request->file('file'))->encode('png',80)->save(public_path().'/img/logo.png');
        return Response::json(array('msgType'=>'success','msg'=>'Logo has been successfully Updated'));
    }
    /**
     * Middleware function 
     *
     * @param  none
     * @return Boolean True or False
     */
    public function checkUser()
    {
        $user = Auth::user();
        if (!$user->hasRole(['owner', 'admin'])){
            return false;
        }
        return true;
    } 
}
