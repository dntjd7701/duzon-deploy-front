import { Button, Card, CardBody, CardHeader, Typography, Spinner, Alert } from '@material-tailwind/react';
import axios from 'axios';
import { useState } from 'react';

interface ModuleCardProps {
  module: string;
}

// error 체크
// 그 로그 파일 보여주기
export function ModuleCard({ module }: ModuleCardProps) {
  // const [loading, setLoading] = useState(false);
  const [loadingFront, setLoadingFront] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [data, setData] = useState({
    state: 0,
    data: [],
  });

  const handleDeploy = async (e: any) => {
    try {
      setLoading(e);
      const { data } = await axios.post(`http://${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/build`, {
        module,
        target: e.target.id,
      });
      setLoading(e, false);
      console.debug('data:', data);

      setData({
        state: data.state,
        data: data.data,
      });

      setOpenAlert(true);

      if (data.state !== -1) {
        setTimeout(() => {
          setOpenAlert(false);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setLoading = ({ target: { id } }: any, onLoading = true) => {
    id === 'front' ? setLoadingFront(onLoading) : setLoadingBack(onLoading);
  };

  return (
    <>
      <Card
        placeholder={''}
        className='border'>
        <CardHeader
          id='deploy'
          placeholder={''}
          className='h-52'
          shadow
          floated>
          <Button
            placeholder={''}
            color={'white'}
            className='w-full h-full '
            onClick={handleDeploy}>
            <Typography
              placeholder={''}
              variant='h2'
              className='flex justify-center items-center normal-case'>
              {`${module.toUpperCase()}`}
            </Typography>
          </Button>
        </CardHeader>

        <CardBody placeholder={''}>
          <div className='flex items-center gap-2'>
            <Typography
              placeholder={''}
              variant='small'
              color='blue'
              className='mb-2 font-normal text-gray-500'>
              모듈 카드 선택 - 배포 일괄
            </Typography>
          </div>
          <div className='flex items-center gap-2'>
            <Typography
              placeholder={''}
              variant='small'
              color='blue'
              className='mb-2 font-normal text-gray-500'>
              세부 버튼 클릭 - 각 버튼별 처리 build only
            </Typography>
          </div>
          <div className='flex justify-between mt-2'>
            {[
              { target: 'front', loadingState: loadingFront },
              { target: 'back', loadingState: loadingBack },
            ].map(({ target, loadingState }) => {
              return (
                <Button
                  key={target}
                  id={target}
                  disabled={loadingState}
                  className='flex flex-col items-center justify-center'
                  placeholder={''}
                  variant='outlined'
                  onClick={handleDeploy}>
                  {loadingState && (
                    <Spinner
                      className='mb-2'
                      color='teal'
                    />
                  )}
                  {target}
                </Button>
              );
            })}
            {/* <Button
            placeholder={''}
            variant='outlined'>
            재시작
          </Button> */}
          </div>
        </CardBody>
      </Card>
      <Alert
        open={openAlert}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        color={'gray'}
        className='w-9/12 h-4/6 z-1000 overflow-auto absolute !transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        // icon={<Icon />}
        onClose={() => {
          setOpenAlert(false);
        }}>
        <Typography
          placeholder={''}
          variant='h2'
          color={data.state === 0 ? 'lime' : 'red'}>
          {data.state === 0 ? '빌드 성공' : '빌드 실패'}
        </Typography>
        <Typography
          placeholder={''}
          color='white'
          className='mt-2 font-normal '>
          <pre>{data.data}</pre>
          {/* <pre className='overflow-hidden'>
            {[
              '🚀------------------------------------------------\nlogis back build start\n🚀------------------------------------------------\n',
              "Your branch is up to date with 'origin/develop'.\n",
              'Updating f756d00fc..4ca6f67fb\nFast-forward\n',
              ' .../klago/logis/blm/blm0000/blm0050/query/common/BLM0050Query.xml    | 5 +++--\n 1 file changed, 3 insertions(+), 2 deletions(-)\n',
              '[INFO] Scanning for projects...',
              '\n',
              '[INFO] \n',
              '[INFO] --------------------------< com.klago:logis >---------------------------\n[INFO] Building logis 1.0.0\n',
              '[INFO] --------------------------------[ war ]---------------------------------\n',
              '[INFO] \n',
              '[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ logis ---\n',
              '[INFO] Deleting /Users/woosung/Desktop/Deploy/target/klago-backend-logis/target\n',
              '[INFO] \n',
              '[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ logis ---\n',
              "[INFO] Using 'UTF-8' encoding to copy filtered resources.",
              '\n',
              '[INFO] Copying 420 resources\n',
              '[INFO] Copying 371 resources\n',
              '[INFO] Copying 368 resources\n',
              '[INFO] \n',
              '[INFO] --- maven-compiler-plugin:3.8.1:compile (default-compile) @ logis ---\n',
              '[INFO] Changes detected - recompiling the module!',
              '\n',
              '[INFO] Compiling 2295 source files to /Users/woosung/Desktop/Deploy/target/klago-backend-logis/target/classes\n',
              '[WARNING] No processor claimed any of these annotations: klago.common.session.annotation.SessionMapping,com.fasterxml.jackson.annotation.JsonProperty,org.springframework.web.bind.annotation.PathVariable,org.springframework.web.bind.annotation.RequestParam,org.junit.runner.RunWith,org.springframework.web.bind.annotation.RequestMapping,org.springframework.beans.factory.annotation.Autowired,org.springframework.stereotype.Controller,com.fasterxml.jackson.annotation.JsonGetter,org.springframework.web.bind.annotation.RequestBody,org.springframework.beans.factory.annotation.Value,klago.openApi.annotation.After,org.springframework.stereotype.Service,org.aspectj.lang.annotation.Aspect,org.springframework.beans.factory.annotation.Qualifier,com.fasterxml.jackson.annotation.JsonIgnore,klago.openApi.annotation.Encrypt,klago.util.module.version.KlagoVersion,klago.util.module.annotation.KlagoApiDesc,klago.util.module.privacy.annotation.Privacy,org.junit.Before,org.springframework.test.context.web.WebAppConfiguration,egovframework.rte.psl.dataaccess.mapper.Mapper,org.apache.ibatis.annotations.Param,klago.openApi.annotation.Decrypt,org.aspectj.lang.annotation.AfterThrowing,klago.openApi.annotation.Before,org.junit.Test,org.aspectj.lang.annotation.Pointcut,com.fasterxml.jackson.annotation.JsonAutoDetect,org.springframework.web.bind.annotation.ResponseBody,klago.util.module.annotation.KlagoController,org.aspectj.lang.annotation.Around,org.junit.jupiter.api.Test,org.springframework.context.annotation.Configuration,org.springframework.stereotype.Component,org.springframework.test.context.ContextConfiguration,com.fasterxml.jackson.annotation.JsonInclude,org.springframework.context.annotation.Bean,com.fasterxml.jackson.annotation.JsonSetter,com.fasterxml.jackson.annotation.JsonIgnoreProperties,org.springframework.transaction.annotation.Transactional,org.apache.ibatis.plugin.Intercepts\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/logisCommon/service/impl/logisCommonService.java:[765,69] unchecked cast\n  required: java.util.Map<java.lang.String,java.lang.Object>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/logisCommon/service/impl/logisCommonService.java:[768,77] unchecked cast\n  required: java.util.List<java.util.Map<java.lang.String,java.lang.Object>>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/service/impl/OpenApiPrivacyService.java:[75,96] unchecked cast\n  required: java.util.List<java.util.Map<java.lang.String,java.lang.Object>>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/codepicker/model/RLBomItemCode.java:[7,8] Class klago.codepicker.model.RLBomItemCode overrides equals, but neither it nor any superclass overrides hashCode method\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/service/AiService.java:[94,83] unchecked cast\n  required: java.util.Map<java.lang.String,java.lang.Object>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/service/AiService.java:[123,51] unchecked cast\n  required: java.util.Map<java.lang.String,java.lang.Object>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/service/AiService.java:[127,51] unchecked cast\n  required: java.util.Map<java.lang.String,java.lang.Object>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/service/AiService.java:[199,71] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[9,37] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[12,14] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[13,14] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[14,14] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[15,14] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[16,14] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[17,14] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[18,14] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[19,14] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[20,14] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>',
              '\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[21,14] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>',
              '\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[22,14] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>',
              '\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[24,21] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>',
              '\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[28,34] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>',
              '\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[32,21] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[36,38] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[40,21] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[44,38] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[48,21] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[52,38] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[56,21] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[60,38] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[64,21] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[68,38] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[72,21] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[76,38] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[80,21] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[84,38] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[88,21] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[92,38] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[96,21] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[100,38] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[104,21] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_selectQueryExcute.java:[108,39] found raw type: java.util.HashMap\n  missing type arguments for generic class java.util.HashMap<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logisutil/util/DateUtils.java:[522,24] Date(int,int,int,int,int,int) in java.util.Date has been deprecated\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/bsa/bsa1000/bsa1080/service/impl/BSA1080Service.java:[42,39] found raw type: java.util.ArrayList\n  missing type arguments for generic class java.util.ArrayList<E>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/bsa/bsa1000/bsa1080/service/impl/BSA1080Service.java:[42,35] unchecked conversion\n  required: java.util.List<java.lang.String>\n  found:    java.util.ArrayList\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/dpPatchTest/Controller/dpPatchTestController.java:[35,44] redundant cast to java.lang.String\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logisutil/extend/ExtendsController.java:[218,45] static method should be qualified by type name, klago.logisutil.helper.RedisManager, instead of by an expression\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/healthCheck/helper/HealthCheckHelper.java:[37,53] static method should be qualified by type name, klago.util.jedis.JedisInfoClient, instead of by an expression\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/healthCheck/helper/HealthCheckHelper.java:[21,33] auto-closeable resource con is never referenced in body of corresponding try statement\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/bsa/bsa1000/bsa1110/model/BSA1110DtlGrid.java:[7,8] Class klago.logis.bsa.bsa1000.bsa1110.model.BSA1110DtlGrid overrides equals, but neither it nor any superclass overrides hashCode method\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/controller/CommonApiContoller.java:[121,96] unchecked cast\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/bsb/bsb0000/bsb0030/service/impl/BSB0030Service.java:[56,34] unchecked call to put(K,V) as a member of the raw type java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/bsb/bsb0000/bsb0030/service/impl/BSB0030Service.java:[57,34] unchecked call to put(K,V) as a member of the raw type java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/bsb/bsb0000/bsb0030/service/impl/BSB0030Service.java:[58,34] unchecked call to put(K,V) as a member of the raw type java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/bsb/bsb0000/bsb0030/service/impl/BSB0030Service.java:[59,34] unchecked call to put(K,V) as a member of the raw type java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/healthCheck/controller/HealthCheckController.java:[51,61] static method should be qualified by type name, klago.logisutil.helper.RedisManager, instead of by an expression\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/service/impl/OpenApiService.java:[331,159] unchecked cast\n  required: java.util.List<java.lang.String>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/service/impl/OpenApiService.java:[346,99] unchecked cast\n  required: java.util.List<java.util.Map<java.lang.String,java.lang.Object>>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/shopApi/service/impl/SHOPAPIService.java:[148,112] redundant cast to klago.logis.blz.blz1000.blz1030.model.BLZ1030LDELIVER_D\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/service/impl/ExecuteQueryService.java:[154,105] unchecked cast\n  required: java.util.List<java.util.Map<java.lang.String,java.lang.Object>>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/service/impl/ExecuteQueryService.java:[462,97] unchecked cast\n  required: java.util.List<java.util.Map<java.lang.String,java.lang.Object>>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/service/impl/ExecuteQueryService.java:[495,97] unchecked cast\n  required: java.util.List<java.util.Map<java.lang.String,java.lang.Object>>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/service/impl/ExecuteQueryService.java:[521,97] unchecked cast\n  required: java.util.List<java.util.Map<java.lang.String,java.lang.Object>>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/service/impl/ExecuteQueryService.java:[547,92] unchecked cast\n  required: java.util.List<java.util.Map<java.lang.String,java.lang.Object>>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/common/mybatis/interceptor/MybatisExecuteInterceptor.java:[158,52] unchecked cast\n  required: java.util.List<java.lang.Object>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/controller/OpenApiContoller.java:[122,96] unchecked cast\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/service/impl/OpenApiDescService.java:[560,51] unchecked conversion\n  required: java.util.List<java.util.Map<java.lang.String,java.lang.Object>>\n  found:    java.util.List\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/openApi/service/impl/OpenApiDescService.java:[609,46] unchecked conversion\n  required: java.util.Map<java.lang.String,java.lang.Object>\n  found:    java.util.LinkedHashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/blz/blz2000/blz2010/service/impl/BLZ2010Service.java:[237,25] possible fall-through into case\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/blz/blz2000/blz2010/service/impl/BLZ2010Service.java:[285,25] possible fall-through into case\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/blz/blz2000/blz2010/service/impl/BLZ2010Service.java:[287,25] possible fall-through into case\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_formMain.java:[23,70] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_formMain.java:[32,70] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap',
              '\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_formMain.java:[41,70] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_formMain.java:[51,70] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_formMain.java:[60,70] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_formMain.java:[69,70] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_formMain.java:[78,70] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_formMain.java:[87,70] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_formMain.java:[96,70] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logis/common/approval/model/R_Approval_formMain.java:[105,71] unchecked conversion\n  required: java.util.HashMap<java.lang.String,java.lang.Object>\n  found:    java.util.HashMap\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[60,22] found raw type: java.util.Map\n  missing type arguments for generic class java.util.Map<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[60,40] found raw type: java.util.Map\n  missing type arguments for generic class java.util.Map<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[60,82] unchecked cast\n  required: java.util.List<java.util.Map>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[65,22] found raw type: java.util.Map\n  missing type arguments for generic class java.util.Map<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[65,51] found raw type: java.util.Map\n  missing type arguments for generic class java.util.Map<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[68,51] unchecked method invocation: method convertKeyToKor in class klago.ai.controller.AiContoller is applied to given types\n  required: java.util.Map<java.lang.String,java.lang.Object>\n  found: java.util.Map\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[68,60] unchecked conversion\n  required: java.util.Map<java.lang.String,java.lang.Object>\n  found:    java.util.Map\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[90,22] found raw type: java.util.Map\n  missing type arguments for generic class java.util.Map<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[90,40] found raw type: java.util.Map\n  missing type arguments for generic class java.util.Map<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[90,82] unchecked cast\n  required: java.util.List<java.util.Map>\n  found:    java.lang.Object\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[95,22] found raw type: java.util.Map\n  missing type arguments for generic class java.util.Map<K,V>\n',
              '[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[95,51] found raw type: java.util.Map\n  missing type arguments for generic class java.util.Map<K,V>',
              '\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[99,51] unchecked method invocation: method convertKeyToKor in class klago.ai.controller.AiContoller is applied to given types\n  required: java.util.Map<java.lang.String,java.lang.Object>\n  found: java.util.Map\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[99,60] unchecked conversion\n  required: java.util.Map<java.lang.String,java.lang.Object>\n  found:    java.util.Map\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/ai/controller/AiContoller.java:[112,17] found raw type: java.util.Map\n  missing type arguments for generic class java.util.Map<K,V>\n[WARNING] /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/main/java/klago/logisutil/util/DecryptUtil.java:[16,13] static variable should be qualified by type name, klago.logisutil.util.DecryptUtil, instead of by an expression\n',
              '[INFO] ',
              '\n',
              '[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ logis ---\n',
              "[INFO] Using 'UTF-8' encoding to copy filtered resources.\n",
              '[INFO] skip non existing resourceDirectory /Users/woosung/Desktop/Deploy/target/klago-backend-logis/src/test/resources\n',
              '[INFO] ',
              '\n',
              '[INFO] --- maven-compiler-plugin:3.8.1:testCompile (default-testCompile) @ logis ---\n',
              '[INFO] No sources to compile\n',
              '[INFO] \n',
              '[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ logis ---\n',
              '[INFO] Tests are skipped.',
              '\n[INFO] ',
              '\n',
              '[INFO] --- maven-war-plugin:3.2.3:war (default-war) @ logis ---\n',
              '[INFO] Packaging webapp',
              '\n',
              '[INFO] Assembling webapp [logis] in [/Users/woosung/Desktop/Deploy/target/klago-backend-logis/target/logis]',
              '\n',
              '[INFO] Processing war project\n',
              '[INFO] Copying webapp resources [/Users/woosung/Desktop/Deploy/target/klago-backend-logis/WebContent]\n',
              '[INFO] Webapp assembled in [5456 msecs]',
              '\n',
              '[INFO] Building war: /Users/woosung/Desktop/Deploy/target/klago-backend-logis/target/logis.war',
              '\n',
              '[INFO] ------------------------------------------------------------------------',
              '\n',
              '[INFO] BUILD SUCCESS\n',
              '[INFO] ------------------------------------------------------------------------\n',
              '[INFO] Total time:  52.784 s',
              '\n',
              '[INFO] Finished at: 2024-04-16T14:16:04+09:00',
              '\n[INFO] ------------------------------------------------------------------------\n',
            ]}
          </pre> */}
        </Typography>
      </Alert>
    </>
  );
}

export default ModuleCard;
