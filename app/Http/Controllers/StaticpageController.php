<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Response;
use App\User;
use App\Staticpage;

class StaticpageController extends Controller
{
    /**
     * Call in the middleware to be used in this Controller
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
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
        $staticpagesData = Staticpage::get();
        return Response::json($staticpagesData);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

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
        $input['sortid'] = Staticpage::max('sortid')+1;
        $input['slug'] = strtolower(preg_replace('/\s*/', '',  $input['title']));
        $staticpageData = Staticpage::create($input);
        $staticpageData->toArray();
        return Response::json(array('staticpageData'=>$staticpageData,'msgType'=>'success','msg'=>'Static Page has been successfully created'));
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id = null)
    {
        if (!$this->checkUser()){
            return Response::json(array('accessDenied'=>'true','msgType'=>'danger','msg'=>'Sorry, you do not have permission. Please contact the website administrator or owner to resolve this issue.'));
        };
        $staticpageData = Staticpage::find($id);
        return Response::json($staticpageData);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $staticpageData = Staticpage::find($id);
        $input['slug'] = strtolower(preg_replace('/\s*/', '',  $input['title']));
        $staticpageData->fill($input);
        $staticpageData->save();
        $staticpageData->toArray();
        return Response::json(array('staticpageData'=>$staticpageData,'msgType'=>'success','msg'=>'Static Page has been successfully updated'));
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Staticpage::find($id)->delete();
        $staticpagesData = Staticpage::get()->toArray();
        return Response::json(array('staticpagesData'=>$staticpagesData,'msgType'=>'danger','msg'=>'Static Page has been successfully deleted'));
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
        if (!$user->hasRole(['owner', 'admin', 'staff'])){
            return false;
        }
        return true;
    } 
}
